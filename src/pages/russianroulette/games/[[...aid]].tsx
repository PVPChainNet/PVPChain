import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next';
import PageContent from '../../../components/page/content';
import Page from '../../../components/page';
import Link from 'next/link';
import Image from 'next/image';
import {useSidebar} from '@/contexts/SidebarContext';
import {Game} from '../../../typescript/contracts';
import {useAccount, useBlockNumber, useContractRead, useContractWrite, usePrepareContractWrite} from 'wagmi';
import {toast} from 'react-toastify';
import {BigNumber, ethers} from 'ethers';
import {useState} from 'react';
import {MdCheckBox, MdOutlineCheckBoxOutlineBlank} from 'react-icons/md';
import {BiMessageSquareX} from 'react-icons/bi';
import handleAddress from '@/root/src/typescript/utils/handleAddress';
import ActionButtonItem from '@/root/src/components/buttons/ActionButton';
import Footer from '@/root/src/components/footer';
import RRPlayer from '@/root/src/components/rrplayer';
import {motion, AnimatePresence} from 'framer-motion';
import ResultsModal from '@/root/src/components/modals/results';

type HomePagePropsT = {props: {aid: number}};

type GameInfoT = {
  gameEnded: boolean;
  tableId: string;
  players: string[];
  loser: string;
  pot: string;
  startTime: string;
};

type TableInfoT = {
  token: string;
  buyIn: string;
  maxPlayers: string;
  duration: string;
  gasToCallRandom: string;
  gameID: string;
};

const GamePage: NextPage = ({aid}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const sidebarStateActive = useSidebar();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleResultsAction = () => {
    console.log('results action');
  };

  const {address, isConnected} = useAccount();
  const [minBuyIn, setMinBuyIn] = useState<string>('0');

  const [gameInfo, setGameInfo] = useState<GameInfoT>({
    gameEnded: false,
    tableId: '0',
    players: [],
    loser: '',
    pot: '0',
    startTime: '0',
  });

  const [tableInfo, setTableInfo] = useState<TableInfoT>({
    token: '',
    buyIn: '0',
    maxPlayers: '0',
    duration: '0',
    gasToCallRandom: '0',
    gameID: '0',
  });

  const {data: blockNumber} = useBlockNumber({
    chainId: 56,
    watch: gameInfo.players.length >= 2,
  });

  const formatAmount = (amount: string) => {
    return ethers.utils.formatUnits(amount || '0', 18);
  };

  const formatBuyIn = () => {
    return ethers.utils.formatUnits(tableInfo.buyIn || '0', 18);
  };

  const tokenName = () => {
    return tableInfo.token === ethers.constants.AddressZero ? 'BNB' : 'Unknown';
  };

  const readConfig = {
    address: Game.address,
    abi: Game.abi,
    chainId: Game.chainId,
  };

  const {config: joinConfig} = usePrepareContractWrite({
    ...readConfig,
    functionName: 'joinGame',
    enabled: gameInfo.tableId !== '0',
    args: [BigNumber.from(gameInfo.tableId), BigNumber.from('0')],
    overrides: {
      value: ethers.utils.parseEther((parseFloat(formatBuyIn()) + parseFloat(minBuyIn || '0')).toString()),
    },
  });

  const {write: joinGame} = useContractWrite({
    ...joinConfig,
    onSettled: (data, error) => {
      if (error) {
        console.log(error);
        toast.error('Error Joining Game');
      } else if (data) {
        toast.info('Join Request Submitted');
        data.wait().then(() => {
          toast.success('Joined Game!');
        });
      }
    },
  });

  const {config: leaveConfig} = usePrepareContractWrite({
    ...readConfig,
    functionName: 'refundGame',
    enabled: gameInfo.tableId !== '0',
    args: [BigNumber.from(gameInfo.tableId)],
  });

  const {write: leaveGame} = useContractWrite({
    ...leaveConfig,
    onSettled: (data, error) => {
      if (error) {
        console.log(error);
        toast.error('Error Leaving Game');
      } else if (data) {
        toast.info('Leave Request Submitted');
        data.wait().then(() => {
          toast.success('Left Game!');
        });
      }
    },
  });

  const {config: endConfig} = usePrepareContractWrite({
    ...readConfig,
    functionName: 'endGame',
    enabled: gameInfo.tableId !== '0',
    args: [BigNumber.from(gameInfo.tableId)],
  });

  const {write: endGame} = useContractWrite({
    ...endConfig,
    onSettled: (data, error) => {
      if (error) {
        console.log(error);
        toast.error('Error Ending Game');
      } else if (data) {
        toast.info('End Game Request Submitted');
        data.wait().then(() => {
          toast.success('Ended Game!');
        });
      }
    },
  });

  useContractRead({
    ...readConfig,
    functionName: 'minBuyInGas',
    onSettled(data, error) {
      if (error) {
        console.log(error);
      } else if (data) {
        setMinBuyIn(ethers.utils.formatEther(data));
      }
    },
  });

  useContractRead({
    ...readConfig,
    functionName: 'getGameInfo',
    args: [aid],
    watch: true,
    onSettled(data, error) {
      if (error) {
        console.log(error);
      } else if (data) {
        setGameInfo({
          gameEnded: data[0] as boolean,
          tableId: data[1].toString(),
          players: data[2] as string[],
          loser: data[3].toString(),
          pot: data[4].toString(),
          startTime: data[5].toString(),
        });
      }
    },
  });

  useContractRead({
    ...readConfig,
    functionName: 'getTableInfo',
    enabled: gameInfo.tableId !== '0',
    args: [BigNumber.from(gameInfo.tableId)],
    onSettled(data, error) {
      if (error) {
        console.log(error);
      } else if (data) {
        setTableInfo({
          token: data[0].toString(),
          buyIn: data[1].toString(),
          maxPlayers: data[2].toString(),
          duration: data[3].toString(),
          gasToCallRandom: data[4].toString(),
          gameID: data[5].toString(),
        });
      }
    },
  });

  const join = () => {
    joinGame?.();
  };

  const leave = () => {
    leaveGame?.();
  };

  const endEarly = () => {
    endGame?.();
  };

  const getCheckbox = (player: string) => {
    if (gameInfo.gameEnded && gameInfo.loser !== ethers.constants.AddressZero) {
      if (player == gameInfo.loser) {
        return <BiMessageSquareX className="mt-2 mr-4" />;
      } else {
        return <MdCheckBox className="mt-2 mr-4" />;
      }
    } else {
      return <MdOutlineCheckBoxOutlineBlank className="mt-2 mr-4" />;
    }
  };

  const getAmountToWin = (): string => {
    return (
      (
        (parseFloat(formatAmount(tableInfo.buyIn)) * parseFloat(tableInfo.maxPlayers) * 0.975) /
        (parseFloat(tableInfo.maxPlayers) - 1)
      ).toFixed(7) +
      ' ' +
      tokenName()
    );
  };

  const getAmountWon = (): string => {
    return (parseFloat(formatAmount(gameInfo.pot)) / (gameInfo.players.length - 1)).toFixed(7) + ' ' + tokenName();
  };

  const getUserFinalStats = (player: string) => {
    const start = isConnected ? (player === address ? '(You)' : '') : '';
    if (gameInfo.gameEnded && gameInfo.loser !== ethers.constants.AddressZero) {
      if (player == gameInfo.loser) {
        return start + ' - ' + parseFloat(formatAmount(tableInfo.buyIn)).toFixed(3) + ' ' + tokenName();
      } else {
        return start + ' + ' + getAmountWon();
      }
    } else {
      return start;
    }
  };

  const shouldDisplayEndEarly = (): boolean => {
    return gameInfo.players.length >= 2 && blocksLeftUntilEarlyEnding() === 0 && gameInfo.gameEnded === false;
  };

  const blocksLeftUntilEarlyEnding = (): number => {
    if (!blockNumber) {
      return 300;
    }
    const endBlock = parseFloat(gameInfo.startTime) + parseFloat(tableInfo.duration);
    return endBlock > blockNumber ? endBlock - blockNumber : 0;
  };

  const isUserInGame = (): boolean => {
    if (isConnected) {
      for (let i = 0; i < gameInfo.players.length; i++) {
        if (gameInfo.players[i] == address) {
          return true;
        }
      }
      return false;
    } else return false;
  };

  //const tempPlayersDEV = 6;

  return (
    <Page showConnectButton={true} showNav={false} showAppFooter={false} showAppHeader={false}>
      {/* <PageContent contentPosition="center"> */}
      <div className={`${sidebarStateActive ? 'sidebarActive' : 'sidebarSmall'} min-h-screen gameBGImageNoFade`}>
        <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
          {isModalOpen && <ResultsModal onAction={handleResultsAction} onClose={handleCloseModal} />}
        </AnimatePresence>
        {/* game window container */}
        <div className="mt-28 mx-10">
          {/* game title and meta info */}
          <div className="bg-slate-extra h-14 rounded-t-lg px-5">
            <div className="flex items-center">
              {/* left content - game title */}
              <h4 className="text-brand-green text-[24px] font-medium flex-none">Russian Roulette - Game {aid}</h4>
              {/* fill middle with grow */}
              <div className="grow"></div>
              {/* right content - meta info */}
              <div className="flex gap-9">
                {/* status */}
                <div className="flex flex-row gap-3">
                  <p className="text-grey-main body16Medium">Status: </p>
                  <div className="flex flex-row gap-1">
                    <p className="text-sm text-white-main font-medium">Joined, Waiting for Players</p>
                    <div className={`my-auto h-[14px] w-[14px] bg-brand-blue rounded-full`}></div>
                  </div>
                </div>
                {/* Buy In */}
                <div className="flex flex-row gap-3">
                  <p className="text-grey-main body16Medium">Buy In: </p>
                  <p className="text-sm text-white-main font-medium">
                    {formatBuyIn()} {tokenName()}
                  </p>
                </div>
                {/* currency */}
                <div className="flex flex-row gap-3">
                  <p className="text-grey-main body16Medium">Currency: </p>
                  <div className="flex flex-row gap-1">
                    <p className="text-sm text-white-main font-medium">WBNB</p>
                    <Image
                      className="my-auto"
                      src={'/images/icons/coinbase.svg'}
                      width={20}
                      height={20}
                      alt={'token'}
                    ></Image>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2 columns main section - left for game, right for players and game details */}
          <div className="flex w-full bg-slate-main min-h-[680px] rounded-b-lg">
            <div className="relative basis-3/4">
              {/* absolute players overlay */}
              <div className="absolute top-10 left-14">
                <h4 className="title20">Players</h4>
                <p className="ml-3 mt-3 text-[32px]">
                  {gameInfo.players.length}/{tableInfo.maxPlayers}
                </p>
              </div>
              {/* DEV: FORCE GAME START */}
              <div className="absolute left-10 bottom-10 mt-10 w-[140px]">
                <button
                  onClick={() => (isModalOpen ? handleCloseModal() : handleOpenModal())}
                  className="h-16 font-bold text-black p-2 border-2 rounded-lg bg-red-600"
                >
                  Force Game Start
                </button>
              </div>
              {/* main game section */}
              <div className="h-3/5 w-3/5 mx-auto mt-20 bg-slate-extra border-8 border-grey-main rounded-full">
                {/* table of players 3-6 players */}
                {/* if <= 3 players */}
                {gameInfo.players.length <= 3 && (
                  <div className="grid grid-rows-2 grid-cols-3 gap-y-8">
                    <div className="col-start-2 h-20 w-full flex justify-center items-center relative">
                      {' '}
                      {/* top center */}
                      <RRPlayer
                        hasJoined={isUserInGame()}
                        isLoggedinUser={isUserInGame()}
                        player={gameInfo.players[0]}
                        positionInGrid="top"
                      />
                    </div>
                    <div className="col-start-1 h-20 w-full flex justify-center items-center relative">
                      {' '}
                      {/* 2nd row left */}
                      <RRPlayer player={gameInfo.players[1]} positionInGrid="left" />
                    </div>
                    <div className="col-start-3 h-20 w-full flex justify-center items-center relative">
                      {' '}
                      {/* 2nd row right */}
                      <RRPlayer player={gameInfo.players[2]} positionInGrid="right" />
                    </div>
                  </div>
                )}
                {/* if 4 players */}
                {gameInfo.players.length == 4 && (
                  <div className="grid grid-rows-3 grid-cols-3 gap-y-8">
                    <div className="col-start-2 h-20 w-full flex justify-center items-center relative">
                      {' '}
                      {/* top center */}
                      <RRPlayer
                        hasJoined={true}
                        isLoggedinUser={true}
                        player={gameInfo.players[0]}
                        positionInGrid="top"
                      />
                    </div>
                    <div className="col-start-1 h-20 w-full flex justify-center items-center relative">
                      {' '}
                      {/* 2nd row left */}
                      <RRPlayer player={gameInfo.players[1]} positionInGrid="left" />
                    </div>
                    <div className="col-start-3 h-20 w-full flex justify-center items-center relative">
                      {' '}
                      {/* 2nd row right */}
                      <RRPlayer player={gameInfo.players[2]} positionInGrid="right" />
                    </div>
                    <div className="col-start-2 h-20 w-full flex justify-center items-center relative">
                      {' '}
                      {/* 3rd row center */}
                      <RRPlayer player={gameInfo.players[3]} positionInGrid="bottom" />
                    </div>
                  </div>
                )}
                {/* if 5 players */}
                {gameInfo.players.length == 5 && (
                  <div className="grid grid-rows-3 grid-cols-9 gap-y-8">
                    <div className="col-start-5 h-20 w-full flex justify-center items-center relative">
                      {' '}
                      {/* top center */}
                      <RRPlayer
                        hasJoined={true}
                        isLoggedinUser={true}
                        player={gameInfo.players[0]}
                        positionInGrid="top"
                      />
                    </div>
                    <div className="col-start-3 h-20 w-full flex justify-center items-center relative">
                      {' '}
                      {/* 2nd row left */}
                      <RRPlayer player={gameInfo.players[1]} positionInGrid="left-top" />
                    </div>
                    <div className="col-start-7 h-20 w-full flex justify-center items-center relative">
                      {' '}
                      {/* 2nd row right */}
                      <RRPlayer player={gameInfo.players[2]} positionInGrid="right-top" />
                    </div>
                    <div className="col-start-4 h-20 w-full flex justify-center items-center relative">
                      {' '}
                      {/* 3rd row left */}
                      <RRPlayer player={gameInfo.players[3]} positionInGrid="left-bottom" />
                    </div>
                    <div className="col-start-6 h-20 w-full flex justify-center items-center relative">
                      {' '}
                      {/* 3rd row right */}
                      <RRPlayer player={gameInfo.players[4]} positionInGrid="right-bottom" />
                    </div>
                  </div>
                )}
                {/* if 6 players */}
                {/* {gameInfo.players.length == 6 && ( */}
                {gameInfo.players.length == 6 && (
                  <div className="grid grid-rows-3 grid-cols-3 gap-y-8">
                    <div className="col-start-2 h-20 w-full flex justify-center items-center relative">
                      {' '}
                      {/* top center */}
                      <RRPlayer
                        hasJoined={true}
                        isLoggedinUser={true}
                        player={gameInfo.players[0]}
                        positionInGrid="top"
                      />
                    </div>
                    <div className="col-start-1 h-20 w-full flex justify-center items-center relative">
                      {' '}
                      {/* 2nd row left */}
                      <RRPlayer player={gameInfo.players[1]} positionInGrid="left-top" />
                    </div>
                    <div className="col-start-3 h-20 w-full flex justify-center items-center relative">
                      {' '}
                      {/* 2nd row right */}
                      <RRPlayer player={gameInfo.players[2]} positionInGrid="right-top" />
                    </div>
                    <div className="col-start-1 h-20 w-full flex justify-center items-center relative">
                      {' '}
                      {/* 3rd row left */}
                      <RRPlayer player={gameInfo.players[3]} positionInGrid="left-bottom" />
                    </div>
                    <div className="col-start-3 h-20 w-full flex justify-center items-center relative">
                      {' '}
                      {/* 3rd row left */}
                      <RRPlayer player={gameInfo.players[4]} positionInGrid="right-top" />
                    </div>
                    <div className="col-start-2 h-20 w-full flex justify-center items-center relative">
                      {' '}
                      {/* 4th row center */}
                      <RRPlayer player={gameInfo.players[5]} positionInGrid="bottom" />
                    </div>
                  </div>
                )}
              </div>

              {/* enter + vote buttons */}
              <div className="mx-auto mt-24 mb-8 w-1/2 flex justify-center gap-10">
                {/* if user has joined */}
                {isUserInGame() ? (
                  <ActionButtonItem text="Joined Game" color="green" />
                ) : (
                  <ActionButtonItem text="Join Game" color="blue" onClick={join} />
                )}
                {/* if user can end early */}
                {shouldDisplayEndEarly() ? (
                  <ActionButtonItem text="Vote to End Early" color="pink" onClick={endEarly} />
                ) : (
                  <ActionButtonItem text="Leave Game" color="pink" onClick={leaveGame} />
                )}
              </div>
            </div>
            <div className="basis-1/4">
              {/* players list */}
              <div className="h-1/2 w-full">
                {/* players table header */}
                <div className="bg-slate-table-header h-9 flex items-center gap-5">
                  {' '}
                  {/* h-12 */}
                  <div className="basis-1/4">
                    <p className="text-center text-grey-main body16Medium border-r-2 border-white-darker">Player #</p>
                  </div>
                  <div className="basis-3/4 flex flex-col">
                    <p className="text-grey-main body16Medium">Player</p>
                  </div>
                </div>
                {/* players table */}
                <div className="h-full bg-slate-extra rounded-l-lg pt-8">
                  {' '}
                  {/* relative -top-1 */}
                  {/* TODO: MAP OVER PLAYERS HERE */}
                  <div className="flex items-center gap-5 mb-4">
                    {/* left column */}
                    <div className="my-auto basis-1/4 flex flex-col">
                      <p className="text-white border-r-2 border-white-darker text-center">1</p>
                    </div>
                    {/* right column */}
                    <div className="basis-3/4 flex flex-col">
                      <p className="text-white text-start">0xcA1551...b88C1F</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 mb-4">
                    {/* left column */}
                    <div className="basis-1/4 flex flex-col">
                      <p className="text-white border-r-2 border-white-darker text-center">2</p>
                    </div>
                    {/* right column */}
                    <div className="basis-3/4 flex flex-col">
                      <p className="text-white text-start">0xcA1551...b88C1F</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 mb-4">
                    {/* left column */}
                    <div className="basis-1/4 flex flex-col">
                      <p className="text-white border-r-2 border-white-darker text-center">3</p>
                    </div>
                    {/* right column */}
                    <div className="basis-3/4 flex flex-col">
                      <p className="text-white text-start">0xcA1551...b88C1F</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 mb-4">
                    {/* left column */}
                    <div className="basis-1/4 flex flex-col">
                      <p className="text-white border-r-2 border-white-darker text-center">4</p>
                    </div>
                    {/* right column */}
                    <div className="basis-3/4 flex flex-col">
                      <p className="text-white text-start">0xcA1551...b88C1F</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 mb-4">
                    {/* left column */}
                    <div className="basis-1/4 flex flex-col">
                      <p className="text-white border-r-2 border-white-darker text-center">5</p>
                    </div>
                    {/* right column */}
                    <div className="basis-3/4 flex flex-col">
                      <p className="text-white text-start">0xcA1551...b88C1F</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 mb-4">
                    {/* left column */}
                    <div className="basis-1/4 flex flex-col">
                      <p className="text-white border-r-2 border-white-darker text-center">6</p>
                    </div>
                    {/* right column */}
                    <div className="basis-3/4 flex flex-col">
                      <p className="text-white text-start">0xcA1551...b88C1F</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* game details */}
              <div className="h-1/2 w-full">
                {/* game details table header */}
                <div className="bg-slate-table-header h-10 flex items-center gap-5">
                  <p className="text-grey-main body16Medium ml-2">Game Details</p>
                </div>
                {/* players table */}
                <div className=" bg-slate-extra relative -top-1 rounded-tl-lg rounded-br-lg pt-4 px-3">
                  {/* vote early section */}
                  <div>
                    <p className="text-sm">End Early: </p>
                    <p className="title32 text-center text-red-500">1 Vote</p>
                    <p className="mt-2 text-sm font-medium text-center">2 Votes Needed</p>
                  </div>
                  <hr className="my-2" />
                  <p className="font-medium text-sm">Amount to Win:</p>
                  <p className="text-[28px] font-medium text-center mt-1 text-yellow-300">0.1218750 BNB</p>
                  <p className="mt-2 font-medium text-sm">Chance to Win:</p>
                  <p className="text-[28px] font-medium text-center mt-1 pb-6">
                    {(100 / parseFloat(tableInfo.maxPlayers)).toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* footer */}
      {/* <Footer /> */}
    </Page>
  );
};

{
  /* <section
            className={`${
              sidebarStateActive ? 'contentContainerWithSidebarNoBG' : 'contentContainerWithoutSidebarNoBG'
            } mb-24`}
          >
            {/* left column 
            <div className="basis-3/4">
              <h4 className="title32 mb-6">
                Players: ({gameInfo.players.length}/{tableInfo.maxPlayers}):
              </h4>
              {/* table 
              <div className="relative w-full">
                <div className="absolute h-[95%] w-[95%] -z-10 bg-slate-500 rounded-full"></div> {/* table bg */
}
{
  /* table of players 3-6 players 
                {/* if <= 3 players 
                {gameInfo.players.length <= 3 && (
                  <div className="grid grid-rows-2 grid-cols-3 gap-y-8">
                    <div className="col-start-2 h-20 w-full flex justify-center items-center">
                      {' '}
                      {/* top center 
                      <div>
                        <div className="mx-auto flex justify-center items-center w-24 h-24 rounded-full bg-grey-main">
                          <Image src={'/images/icons/profile-64.png'} width={78} height={78} alt={'token'} />
                        </div>
                        <p className="mt-4 mx-auto">{gameInfo.players[0]}</p>
                      </div>
                    </div>
                    <div className="col-start-1 h-20 w-full flex justify-center items-center">
                      {' '}
                      {/* 2nd row left 
                      <div className="flex w-20 h-20 rounded-full bg-orange-300">
                        <p className="m-auto">{gameInfo.players[1]}</p>
                      </div>
                    </div>
                    <div className="col-start-3 h-20 w-full flex justify-center items-center">
                      {' '}
                      {/* 2nd row right 
                      <div className="flex w-20 h-20 rounded-full bg-indigo-300">
                        <p className="m-auto">{gameInfo.players[2]}</p>
                      </div>
                    </div>
                  </div>
                )}
                {/* if 4 players 
                {gameInfo.players.length == 4 && (
                  <div className="grid grid-rows-3 grid-cols-3 gap-y-8">
                    <div className="col-start-2 h-20 w-full flex justify-center items-center">
                      {' '}
                      {/* top center 
                      <div className="flex w-20 h-20 rounded-full bg-red-300">
                        <p className="m-auto">{gameInfo.players[0]}</p>
                      </div>
                    </div>
                    <div className="col-start-1 h-20 w-full flex justify-center items-center">
                      {' '}
                      {/* 2nd row left 
                      <div className="flex w-20 h-20 rounded-full bg-orange-300">
                        <p className="m-auto">{gameInfo.players[1]}</p>
                      </div>
                    </div>
                    <div className="col-start-3 h-20 w-full flex justify-center items-center">
                      {' '}
                      {/* 2nd row right 
                      <div className="flex w-20 h-20 rounded-full bg-yellow-300">
                        <p className="m-auto">{gameInfo.players[2]}</p>
                      </div>
                    </div>
                    <div className="col-start-2 h-20 w-full flex justify-center items-center">
                      {' '}
                      {/* 3rd row center 
                      <div className="flex w-20 h-20 rounded-full bg-indigo-300">
                        <p className="m-auto">{gameInfo.players[3]}</p>
                      </div>
                    </div>
                  </div>
                )}
                {/* if 5 players 
                {gameInfo.players.length == 5 && (
                  <div className="grid grid-rows-3 grid-cols-9 gap-y-8">
                    <div className="col-start-5 h-20 w-full flex justify-center items-center">
                      {' '}
                      {/* top center 
                      <div className="flex w-20 h-20 rounded-full bg-red-300">
                        <p className="m-auto">{gameInfo.players[0]}</p>
                      </div>
                    </div>
                    <div className="col-start-3 h-20 w-full flex justify-center items-center">
                      {' '}
                      {/* 2nd row left 
                      <div className="flex w-20 h-20 rounded-full bg-orange-300">
                        <p className="m-auto">{gameInfo.players[1]}</p>
                      </div>
                    </div>
                    <div className="col-start-7 h-20 w-full flex justify-center items-center">
                      {' '}
                      {/* 2nd row right 
                      <div className="flex w-20 h-20 rounded-full bg-indigo-300">
                        <p className="m-auto">{gameInfo.players[2]}</p>
                      </div>
                    </div>
                    <div className="col-start-4 h-20 w-full flex justify-center items-center">
                      {' '}
                      {/* 3rd row left 
                      <div className="flex w-20 h-20 rounded-full bg-yellow-300">
                        <p className="m-auto">{gameInfo.players[3]}</p>
                      </div>
                    </div>
                    <div className="col-start-6 h-20 w-full flex justify-center items-center">
                      {' '}
                      {/* 3rd row right 
                      <div className="flex w-20 h-20 rounded-full bg-red-300">
                        <p className="m-auto">{gameInfo.players[4]}</p>
                      </div>
                    </div>
                  </div>
                )}
                {/* if 6 players 
                {/* {gameInfo.players.length == 6 && ( 
                {gameInfo.players.length == 6 && (
                  <div className="grid grid-rows-3 grid-cols-3 gap-y-8">
                    <div className="col-start-2 h-20 w-full flex justify-center items-center">
                      {' '}
                      {/* top center 
                      <div className="flex w-20 h-20 rounded-full bg-red-300">
                        <p className="m-auto">{gameInfo.players[0]}</p>
                      </div>
                    </div>
                    <div className="col-start-1 h-20 w-full flex justify-center items-center">
                      {' '}
                      {/* 2nd row left 
                      <div className="flex w-20 h-20 rounded-full bg-orange-300">
                        <p className="m-auto">{gameInfo.players[1]}</p>
                      </div>
                    </div>
                    <div className="col-start-3 h-20 w-full flex justify-center items-center">
                      {' '}
                      {/* 2nd row right 
                      <div className="flex w-20 h-20 rounded-full bg-indigo-300">
                        <p className="m-auto">{gameInfo.players[2]}</p>
                      </div>
                    </div>
                    <div className="col-start-1 h-20 w-full flex justify-center items-center">
                      {' '}
                      {/* 3rd row left 
                      <div className="flex w-20 h-20 rounded-full bg-pink-300">
                        <p className="m-auto">{gameInfo.players[3]}</p>
                      </div>
                    </div>
                    <div className="col-start-3 h-20 w-full flex justify-center items-center">
                      {' '}
                      {/* 3rd row left 
                      <div className="flex w-20 h-20 rounded-full bg-yellow-300">
                        <p className="m-auto">{gameInfo.players[4]}</p>
                      </div>
                    </div>
                    <div className="col-start-2 h-20 w-full flex justify-center items-center">
                      {' '}
                      {/* 4th row center 
                      <div className="flex w-20 h-20 rounded-full bg-red-300">
                        <p className="m-auto">{gameInfo.players[5]}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* <div className="addressGrid">
                {gameInfo.players.map((player, i) => {
                  return (
                    <div key={i} className="w-[208px]">
                      {getCheckbox(player)} {handleAddress(player)} &nbsp; &nbsp; {getUserFinalStats(player)}
                    </div>
                  );
                })}
              </div> 
            </div>
            {/* right column 
            <div className="basis-1/4 mb-4">
              {/* status section 
              <p className="text-[24px] font-medium mb-4">Status: </p>
              <div className="ml-9 title20 flex flex-col gap-6">
                {/* TODO: UPDATE STATUSES 
                <p>Joined - Table Full </p>
                {gameInfo.players.length >= 2 &&
                  gameInfo.gameEnded === false &&
                  isUserInGame() == true &&
                  blocksLeftUntilEarlyEnding() > 0 && (
                    <code className="mb-8">Can End Early In: {blocksLeftUntilEarlyEnding() * 3}s</code>
                  )}
                {shouldDisplayEndEarly() && isUserInGame() == true && (
                  <button className="border border-white mb-8" onClick={() => endEarly()}>
                    End Game Early
                  </button>
                )}
                {gameInfo.gameEnded === false && isUserInGame() == false && (
                  // <button className="border border-white mb-8" onClick={() => join()}>
                  //   Join Game
                  // </button>
                  <button className="w-full max-w-[244px]" onClick={() => join()}>
                    <ActionButtonItem text="Join Game" color="blue" link={''} />
                  </button>
                )}
                {isUserInGame() && gameInfo.players.length == 1 && (
                  <button className="border border-white mb-8" onClick={() => leave()}>
                    Leave Game
                  </button>
                )}
              </div>
              {/* details section 
              <p className="text-[24px] font-medium mt-8 mb-4">Details: </p>
              <div className="ml-9 body18 flex flex-col gap-6">
                <div className="flex gap-8 align-middle">
                  <p>Players at Table: </p>
                  <p>
                    ({gameInfo.players.length}/{tableInfo.maxPlayers})
                  </p>
                </div>
                <div className="flex gap-8 align-middle">
                  <p>Buy In: </p>
                  <p>
                    {formatBuyIn()} {tokenName()}
                  </p>
                </div>
                <div className="flex gap-8 align-middle">
                  <p>Amount to Win: </p>
                  <p>{getAmountToWin()}</p>
                </div>
                <div className="flex gap-8 align-middle">
                  <p>Chance to Win: </p>
                  <p>{(100 / parseFloat(tableInfo.maxPlayers)).toFixed(2)}%</p>
                </div>
              </div>
            </div>
          </section>
        </div> */
}

{
  /* original game page */
}
{
  /* <h1 className="text-4xl font-bold absolute top-10">Russian Roulette</h1>
        <h4 className="text-3xl font-bold absolute top-24">Game {aid}</h4>
        <hr /> */
}

{
  /* <div className="mt-10 flex flex-col text-center text-xl">
          <code className="mb-8">
            Buy In: {formatBuyIn()} {tokenName()}
          </code>
          <code className="mb-8">
            {' '}
            {/** Make it fetch platformFee from contract 
            Amount To Win: {getAmountToWin()}
          </code>
          <code className="mb-8">
            Chance To Win:{' '}
            {((100 * (parseFloat(tableInfo.maxPlayers) - 1)) / parseFloat(tableInfo.maxPlayers)).toFixed(2)}%
          </code>
          {gameInfo.players.length >= 2 &&
            gameInfo.gameEnded === false &&
            isUserInGame() == true &&
            blocksLeftUntilEarlyEnding() > 0 && (
              <code className="mb-8">Can End Early In: {blocksLeftUntilEarlyEnding() * 3}s</code>
            )}
          {shouldDisplayEndEarly() && isUserInGame() == true && (
            <button className="border border-white mb-8" onClick={() => endEarly()}>
              End Game Early
            </button>
          )}
          {gameInfo.gameEnded === false && isUserInGame() == false && (
            <button className="border border-white mb-8" onClick={() => join()}>
              Join Game
            </button>
          )}
          {isUserInGame() && gameInfo.players.length == 1 && (
            <button className="border border-white mb-8" onClick={() => leave()}>
              Leave Game
            </button>
          )}
          <div className="w-full">
            <code className="mb-8">
              Players ({gameInfo.players.length}/{tableInfo.maxPlayers}):
            </code>
            {gameInfo.players.map((player, i) => {
              return (
                <div key={i} className="flex flex-row mt-4">
                  {getCheckbox(player)} {handleAddress(player)} &nbsp; &nbsp; {getUserFinalStats(player)}
                </div>
              );
            })}
          </div>
        </div> */
}

{
  /* <Link href={'/roulette'} className="border border-white p-2 absolute bottom-4">
          Go Back
        </Link> */
}
{
  /* </PageContent> */
}

export const getServerSideProps: GetServerSideProps = async function ({params}) {
  // Set default props, returning 0
  const returnProps: HomePagePropsT = {props: {aid: 0}};
  // console.log('params', params)
  returnProps.props.aid = params?.aid ? parseInt(params.aid[0] as string) : 0;
  // if returnProps.props.aid is not a number, return 0
  if (isNaN(returnProps.props.aid)) {
    returnProps.props.aid = 0;
  }
  // console.log('returnProps', returnProps)
  return returnProps;
};

export default GamePage;
