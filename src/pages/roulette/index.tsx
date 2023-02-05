import {NextPage} from 'next';

import PageContent from '@/components/page/content';
import Page from '@/components/page';
import {useState} from 'react';

import {Game} from '../../typescript/contracts';
import {useAccount, useContractRead, useContractWrite} from 'wagmi';
import {BigNumber, ethers} from 'ethers';
import {toast} from 'react-toastify';
import {useRouter} from 'next/router';
import Link from 'next/link';

type TableT = {
  Token: string;
  buyIn: string;
  maxPlayers: string;
  duration: string;
  numberOfPlayers: string;
  pots: string;
  gameID: string;
  startTimes: string;
};

const Home: NextPage = () => {
  const {isConnected} = useAccount();

  const router = useRouter();

  const [tables, setTables] = useState<TableT[]>([]);
  const [minBuyIn, setMinBuyIn] = useState<string>('');

  const readConfig = {
    address: Game.address,
    abi: Game.abi,
    chainId: Game.chainId,
  };

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
    functionName: 'listTableAndGamesInfo',
    watch: true,
    onSettled(data, error) {
      if (error) {
        console.log(error);
      } else if (data) {
        const allTables: TableT[] = [];
        for (let i = 0; i < data[0].length; i++) {
          allTables.push({
            Token: data[0][i].toString(),
            buyIn: data[1][i].toString(),
            maxPlayers: data[2][i].toString(),
            duration: data[3][i].toString(),
            numberOfPlayers: data[4][i].toString(),
            pots: data[5][i].toString(),
            gameID: data[6][i].toString(),
            startTimes: data[7][i].toString(),
          });
        }
        setTables(allTables);
      }
    },
  });

  // const {write: startGame} = useContractWrite({
  //   ...readConfig,
  //   mode: 'recklesslyUnprepared',
  //   functionName: 'startAndJoin',
  //   onSettled: (data, error) => {
  //     if (error) {
  //       console.log(error);
  //     } else if (data) {
  //       data.wait().then(() => {
  //         toast.success('Game Started');
  //       });
  //     }
  //   },
  // });

  const {write: joinGame} = useContractWrite({
    ...readConfig,
    mode: 'recklesslyUnprepared',
    functionName: 'joinGame',
    onSettled: (data, error) => {
      if (error) {
        console.log(error);
      } else if (data) {
        data.wait().then(() => {
          toast.success('Game Started');
        });
      }
    },
  });

  const formatBuyIn = (table: TableT): string => {
    return ethers.utils.formatUnits(table.buyIn || '0', 18);
  };

  const tokenName = (table: TableT) => {
    return table.Token === ethers.constants.AddressZero ? 'BNB' : 'Unknown';
  };

  const timeRemainingString = (table: TableT) => {
    if (table.numberOfPlayers === '0') {
      return 'Start Game';
    } else {
      return 'Join Game';
    }
  };

  const tableClick = (table: TableT, tableIndex: number) => {
    if (table.numberOfPlayers === '0') {
      joinGame?.({
        recklesslySetUnpreparedArgs: [BigNumber.from(tableIndex), BigNumber.from('0')],
        recklesslySetUnpreparedOverrides: {
          value: ethers.utils.parseEther((parseFloat(formatBuyIn(table)) + parseFloat(minBuyIn)).toString()),
        },
      });
    } else {
      const path = '/roulette/games/' + table.gameID;
      router.push(path);
      // joinGame?.({
      //   recklesslySetUnpreparedArgs: [BigNumber.from(tableIndex), BigNumber.from('0')],
      //   recklesslySetUnpreparedOverrides: {
      //     value: ethers.utils.parseEther((parseFloat(formatBuyIn(table)) + parseFloat(minBuyIn)).toString()),
      //   },
      // });
    }
  };

  const goToHistory = () => {
    router.push('/roulette/history');
  };

  return (
    <Page showConnectButton={true} showNav={false} showAppFooter={false} showAppHeader={false}>
      <PageContent contentPosition="center">
        <h1 className="text-4xl font-bold absolute top-10">Russian Roulette</h1>
        <hr />
        <div className="w-full text-xl text-brand-8 grid grid-cols-4 grid-rows-3 items-center mt-24">
          {tables.map((table, i) => {
            return (
              <div
                className="cursor-pointer border border-solid border-white text-center m-10 flex flex-col p-4"
                key={i}
                onClick={() => tableClick(table, i + 1)}
              >
                <code className="mb-5">Table {i + 1}</code>
                <code>
                  Buy In: {formatBuyIn(table)} {tokenName(table)}
                </code>
                <code>
                  Players: {table.numberOfPlayers}/{table.maxPlayers}
                </code>
                <code>{timeRemainingString(table)}</code>
              </div>
            );
          })}
        </div>
        {isConnected && (
          <Link href={'/roulette/history'} className="border border-white p-2 mb-24 ">
            View Game History
          </Link>
        )}
      </PageContent>
    </Page>
  );
};

export default Home;
