import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next';
import PageContent from '../../../components/page/content';
import Page from '../../../components/page';
import Link from 'next/link';
import Image from 'next/image';
import {useSidebar} from '@/contexts/SidebarContext';
import {WinnerTakesAll} from '../../../typescript/contracts';
import {useAccount, useBlockNumber, useContractRead, useContractWrite, usePrepareContractWrite} from 'wagmi';
import {toast} from 'react-toastify';
import {BigNumber, ethers} from 'ethers';
import {useState} from 'react';
import {MdCheckBox, MdOutlineCheckBoxOutlineBlank} from 'react-icons/md';
import {BiMessageSquareX} from 'react-icons/bi';
import handleAddress from '@/root/src/typescript/utils/handleAddress';
import ActionButtonItem from '@/root/src/components/buttons/ActionButton';

type HomePagePropsT = {props: {aid: number}};

type GameInfoT = {
  gameEnded: boolean;
  tableId: string;
  players: string[];
  winner: string;
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
  const {address, isConnected} = useAccount();
  const [minBuyIn, setMinBuyIn] = useState<string>('0');

  const [gameInfo, setGameInfo] = useState<GameInfoT>({
    gameEnded: false,
    tableId: '0',
    players: [],
    winner: '',
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
    address: WinnerTakesAll.address,
    abi: WinnerTakesAll.abi,
    chainId: WinnerTakesAll.chainId,
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
          winner: data[3].toString(),
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
    if (gameInfo.gameEnded && gameInfo.winner !== ethers.constants.AddressZero) {
      if (player == gameInfo.winner) {
        return <MdCheckBox className="mt-2 mr-4" />;
      } else {
        return <BiMessageSquareX className="mt-2 mr-4" />;
      }
    } else {
      return <MdOutlineCheckBoxOutlineBlank className="mt-2 mr-4" />;
    }
  };

  const getAmountToWin = (): string => {
    return (
      (parseFloat(formatAmount(tableInfo.buyIn)) * parseFloat(tableInfo.maxPlayers) * 0.95).toFixed(4) +
      ' ' +
      tokenName()
    );
  };

  const getAmountWon = (): string => {
    return parseFloat(formatAmount(gameInfo.pot)).toFixed(7) + ' ' + tokenName();
  };

  const getUserFinalStats = (player: string) => {
    const start = isConnected ? (player === address ? '(You)' : '') : '';
    if (gameInfo.gameEnded && gameInfo.winner !== ethers.constants.AddressZero) {
      if (player == gameInfo.winner) {
        return start + ' + ' + getAmountWon();
      } else {
        return start + ' - ' + parseFloat(formatAmount(tableInfo.buyIn)).toFixed(3) + ' ' + tokenName();
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

  return (
    <Page showConnectButton={true} showNav={false} showAppFooter={false} showAppHeader={false}>
      <div className={`${sidebarStateActive ? 'sidebarActive' : 'sidebarSmall'} min-h-screen gameBGImageNoFade`}>
        {/* game window container */}
        <div className="mt-28 mx-10">
          {/* game title and meta info */}
          <div className="bg-slate-extra h-14 rounded-t-lg px-5">
            <div className="flex items-center">
              {/* left content - game title */}
              <h4 className="text-brand-green text-[24px] font-medium flex-none">Winner Takes All - Game {aid}</h4>
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
          <div className="flex w-full bg-slate-main min-h-[680px] h-4/5 rounded-b-lg">
            <div className="basis-3/4">
              <div className="flex gap-28 py-6 ml-10">
                {/* players info */}
                <div className="flex flex-col">
                  <h4 className="title20">Players</h4>
                  <p className="mt-3 text-[32px]">
                    {gameInfo.players.length}/{tableInfo.maxPlayers}
                  </p>
                </div>
                {/* time until start info */}
                <div className="">
                  <h4 className="title20">Time Until Game Starts: </h4>
                  <p className="mt-3 text-[32px]">4 Hours, 12 Minutes, 32 Seconds</p>
                </div>
              </div>

              {/* main game section */}
              <div className="min-h-[500px] mx-10 mb-8 pt-5 bg-slate-extra rounded-lg">
                <div className="ml-20 mr-10">
                  {/* user entry, if joined */}
                  {/* {isUserInGame() && ( */}
                  <div className="flex gap-9 items-center">
                    <div className="drop-shadow-xl border-2 border-brand-green rounded-full">
                      <Image
                        className="my-auto"
                        src={'/images/icons/coinbase.svg'}
                        width={40}
                        height={40}
                        alt={'token'}
                      ></Image>{' '}
                      {/* user icon */}
                    </div>
                    <p className="text-[14px] font-light text-brand-green">0xcA1551...b88C1F</p> {/* user address */}
                    <p className="text-[14px] font-light text-brand-green">12</p> {/* entry count */}
                  </div>
                  {/* )} */}
                  {/* users-in-game table header */}
                  <div className="my-4 ml-12 flex gap-12 w-[208px]">
                    <p className="text-grey-main text-[16px]">Player</p>
                    <p className="text-grey-main text-[16px]">Entries</p>
                  </div>
                  {/* TODO: MAP PLAYERS */}
                  <div className="flex gap-2 w-[208px]">
                    <p>wallet address</p>
                    <p className="font-bold">entry count</p>
                  </div>

                  {/* {gameInfo.players.map((player, i) => {
                    return (
                      <div key={i} className="w-[208px]">
                        {getCheckbox(player)} {handleAddress(player)} &nbsp; &nbsp; {getUserFinalStats(player)}
                      </div>
                    );
                  })} */}
                </div>
              </div>

              {/* enter + vote buttons */}
              <div className="mx-auto my-8 w-1/2 flex justify-center gap-10">
                {/* select entry count */}
                <div className="flex flex-col">
                  {/* <p className="text-[16px] font-medium">Select Entry Count</p> */}
                  <div className="flex gap-3 mt-2">
                    <div className="flex-grow">
                      <input
                        className="rounded-lg w-full h-[40px] bg-slate-extra text-[24px] text-center"
                        type="number"
                        placeholder="0"
                      />
                    </div>
                    <div className="flex-none">
                      <button className="w-[48px] h-[40px] rounded-lg bg-brand-green-hover text-white-main">+</button>
                    </div>
                  </div>
                </div>
                <ActionButtonItem text={`Play with _ entries`} color="blue" link={''} />
              </div>
            </div>

            <div className="basis-1/4 flex items-center">
              {/* game details */}
              <div className="h-1/2 w-full">
                {/* game details table header */}
                <div className="bg-slate-table-header rounded-tl-lg h-10 flex items-center gap-5">
                  <p className="text-grey-main body16Medium ml-2">Game Details</p>
                </div>
                {/* players table */}
                <div className=" bg-slate-extra relative -top-1 rounded-l-lg rounded-br-lg pt-4 px-3">
                  {/* vote early section */}
                  <div>
                    <p className="text-sm">Time Until Start: </p>
                    <p className="title32 text-center text-brand-purple">04:12:32</p>
                    <p className="mt-2 text-sm font-medium text-center">Or Until Players Fill</p>
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

        {/* old info container */}
        <div className="mt-24 mx-[4.5rem]">
          <h4 className="text-brand-green mb-16">Winner Takes All - Game {aid}</h4>
          <section
            className={`${
              sidebarStateActive ? 'contentContainerWithSidebarNoBG' : 'contentContainerWithoutSidebarNoBG'
            } mb-24`}
          >
            {/* left column */}
            <div className="basis-3/4">
              <h4 className="title32 mb-6">
                Players: ({gameInfo.players.length}/{tableInfo.maxPlayers}):
              </h4>
              {/* table of players */}
              <div className="addressGrid">
                {/* temp data wheile players are none */}
                <div className="flex gap-2 w-[208px]">
                  <p>wallet address</p>
                  <p className="font-bold">entry count</p>
                </div>
                <div className="flex gap-2 w-[208px]">
                  <p>wallet address</p>
                  <p className="font-bold">entry count</p>
                </div>
                <div className="flex gap-2 w-[208px]">
                  <p>wallet address</p>
                  <p className="font-bold">entry count</p>
                </div>
                <div className="flex gap-2 w-[208px]">
                  <p>wallet address</p>
                  <p className="font-bold">entry count</p>
                </div>
                <div className="flex gap-2 w-[208px]">
                  <p>wallet address</p>
                  <p className="font-bold">entry count</p>
                </div>

                {gameInfo.players.map((player, i) => {
                  return (
                    <div key={i} className="w-[208px]">
                      {getCheckbox(player)} {handleAddress(player)} &nbsp; &nbsp; {getUserFinalStats(player)}
                    </div>
                  );
                })}
              </div>
            </div>
            {/* right column */}
            <div className="basis-1/4 mb-4">
              {/* status section */}
              <p className="text-[24px] font-medium mb-4">Status: </p>
              <div className="ml-9 title20 flex flex-col gap-6">
                {/* TODO: UPDATE STATUSES */}
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
              {/* details section */}
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
        </div>
        {/* <h1 className="text-4xl font-bold absolute top-10">Winner Takes All</h1>
        <h1 className="text-3xl font-bold absolute top-24">Game {aid}</h1>
        <hr /> */}
        <div className="mt-10 flex flex-col text-center text-xl">
          <code className="mb-8">
            Buy In: {formatBuyIn()} {tokenName()}
          </code>
          <code className="mb-8">
            {' '}
            {/* Make it fetch platformFee from contract */}
            Amount To Win: {getAmountToWin()}
          </code>
          <code className="mb-8">Chance To Win: {(100 / parseFloat(tableInfo.maxPlayers)).toFixed(2)}%</code>
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
        </div>

        {/* <Link href={'/winnertakesall'} className="border border-white p-2 absolute bottom-4">
          Go Back
        </Link> */}
      </div>
    </Page>
  );
};

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
