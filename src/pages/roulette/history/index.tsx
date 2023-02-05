import {NextPage} from 'next';

import PageContent from '@/components/page/content';
import Page from '@/components/page';
import {useState} from 'react';

import {History} from '../../../typescript/contracts';
import {useAccount, useContractRead} from 'wagmi';
import {ethers} from 'ethers';
import Link from 'next/link';

type HistoryT = {
  buyIn: string;
  token: string;
  gameId: string;
  time: string;
  versionNo: string;
  lost: boolean;
};

const Home: NextPage = () => {
  const {address, isConnected} = useAccount();

  const [history, setHistory] = useState<HistoryT[]>();

  const readConfig = {
    address: History.address,
    abi: History.abi,
    chainId: History.chainId,
  };

  useContractRead({
    ...readConfig,
    functionName: 'getUserData',
    enabled: isConnected,
    args: [address || ethers.constants.AddressZero],
    onSettled(data, error) {
      if (error) {
        console.log(error);
      } else if (data) {
        const allHistory: HistoryT[] = [];
        for (let i = 0; i < data[0].length; i++) {
          allHistory.push({
            buyIn: data[0][i].toString(),
            token: data[1][i].toString(),
            gameId: data[2][i].toString(),
            time: data[3][i].toString(),
            versionNo: data[4][i].toString(),
            lost: data[5][i] as boolean,
          });
        }
        setHistory(allHistory);
      }
    },
  });

  const formatBuyIn = (entry: HistoryT): string => {
    return ethers.utils.formatUnits(entry.buyIn || '0', 18);
  };

  const tokenName = (entry: HistoryT) => {
    return entry.token === ethers.constants.AddressZero ? 'BNB' : 'Unknown';
  };

  return (
    <Page showConnectButton={true} showNav={false} showAppFooter={false} showAppHeader={false}>
      <PageContent contentPosition="center">
        <h1 className="text-4xl font-bold absolute top-10">Russian Roulette History</h1>
        <hr />
        <div className="w-full text-xl text-brand-8 flex flex-col items-center">
          {history?.map((entry, i) => {
            if (entry.lost) {
              return (
                <div key={i} className="flex flex-row justify-between w-1/2 border border-red-400 mb-4">
                  <code>{new Date(parseFloat(entry.time) * 1000).toDateString()}</code>
                  <code> LOSS </code>
                  <code>
                    Buy In: {formatBuyIn(entry)} {tokenName(entry)}
                  </code>
                </div>
              );
            } else {
              return (
                <div key={i} className="flex flex-row justify-between w-1/2 border border-green-400 mb-4">
                  <code>{new Date(parseFloat(entry.time) * 1000).toDateString()}</code>
                  <code> WIN </code>
                  <code>
                    Buy In: {formatBuyIn(entry)} {tokenName(entry)}
                  </code>
                </div>
              );
            }
          })}

          <Link href={'/roulette'} className="border border-white p-2 absolute bottom-4">
            Go Back
          </Link>
        </div>
      </PageContent>
    </Page>
  );
};

export default Home;
