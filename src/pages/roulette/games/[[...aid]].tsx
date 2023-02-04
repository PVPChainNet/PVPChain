import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next';
import PageContent from '../../../components/page/content';
import Page from '../../../components/page';
import Link from 'next/link';
import {Game} from '../../../typescript/contracts';
import {useAccount, useContractRead, useContractWrite, usePrepareContractWrite} from 'wagmi';
import {toast} from 'react-toastify';
import {BigNumber, ethers} from 'ethers';
import {useState} from 'react';
import {MdCheckBox, MdOutlineCheckBoxOutlineBlank, MdIndeterminateCheckBox} from 'react-icons/md';
import handleAddress from '@/root/src/typescript/utils/handleAddress';

type HomePagePropsT = {props: {aid: number}};

type GameInfoT = {
  gameEnded: boolean;
  tableId: string;
  players: string[];
  loser: string;
  pot: string;
  startTime: string;
  timeRemaining: string;
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
  const [minBuyIn, setMinBuyIn] = useState<string>('0');

  const [gameInfo, setGameInfo] = useState<GameInfoT>({
    gameEnded: false,
    tableId: '0',
    players: [],
    loser: '',
    pot: '0',
    startTime: '0',
    timeRemaining: '0',
  });

  const [tableInfo, setTableInfo] = useState<TableInfoT>({
    token: '',
    buyIn: '0',
    maxPlayers: '0',
    duration: '0',
    gasToCallRandom: '0',
    gameID: '0',
  });

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
          timeRemaining: data[6].toString(),
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

  const showTimeRemaining = () => {
    if (BigNumber.from(gameInfo.timeRemaining).eq(ethers.constants.MaxUint256)) {
      return 'Waiting For More Players';
    } else {
      return gameInfo.timeRemaining + 's';
    }
  };

  const join = () => {
    joinGame?.();
    // joinGame?.({
    //     recklesslySetUnpreparedArgs: [BigNumber.from(tableIndex), BigNumber.from('0')],
    //     recklesslySetUnpreparedOverrides: {
    //       value: ethers.utils.parseEther((parseFloat(formatBuyIn(table)) + parseFloat(minBuyIn)).toString()),
    //     },
    //   });
  };

  const getCheckbox = (player: string) => {
    if (gameInfo.gameEnded && gameInfo.loser !== ethers.constants.AddressZero) {
      if (player == gameInfo.loser) {
        return <MdIndeterminateCheckBox className="mt-2 mr-4" />;
      } else {
        return <MdCheckBox className="mt-2 mr-4" />;
      }
    } else {
      return <MdOutlineCheckBoxOutlineBlank className="mt-2 mr-4" />;
    }
  };

  return (
    <Page showConnectButton={true} showNav={false} showAppFooter={false} showAppHeader={false}>
      <PageContent contentPosition="center">
        <h1 className="text-4xl font-bold absolute top-10">Game {aid}</h1>
        <hr />
        <div className="mt-10 flex flex-col text-center text-xl">
          <code className="mb-4">
            Buy In: {formatBuyIn()} {tokenName()}
          </code>
          <code className="mb-4">Duration: {tableInfo.duration}s</code>
          <code className="mb-8">Time Remaining: {showTimeRemaining()}</code>
          {gameInfo.gameEnded === false && (
            <button className="border border-white mb-8" onClick={() => join()}>
              Join Game
            </button>
          )}
          <div className="w-full">
            <code className="mb-8">
              Players ({gameInfo.players.length}/{tableInfo.maxPlayers}):
            </code>
            {gameInfo.players.map((player, i) => {
              return (
                <div key={i} className="flex flex-row mt-4">
                  {getCheckbox(player)} {handleAddress(player)}
                </div>
              );
            })}
          </div>
        </div>

        <Link href={'/roulette'} className="border border-white p-2 absolute bottom-4">
          Go Back
        </Link>
      </PageContent>
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
