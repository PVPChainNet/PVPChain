import Page from '@/components/page';
import {useSidebar} from '@/contexts/SidebarContext';
import ActionButtonItem from '../../components/buttons/ActionButton';
import {useState} from 'react';
import {useRouter} from 'next/router';
import {BigNumber, ethers} from 'ethers';
import {useAccount, useContractRead, useContractWrite} from 'wagmi';
import {Game} from '../../typescript/contracts';
import {toast} from 'react-toastify';
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

export default function PredictionMarket() {
  const sidebarStateActive = useSidebar();

  const {isConnected} = useAccount();

  const router = useRouter();

  const [tables, setTables] = useState<TableT[]>([]);
  const [minBuyIn, setMinBuyIn] = useState<string>('');
  const [tableCurrency, setTableCurrency] = useState<string>('');

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

  const formatBuyIn = (table: TableT): string => {
    return ethers.utils.formatUnits(table.buyIn || '0', 18);
  };

  const tokenName = (table: TableT) => {
    return table.Token === ethers.constants.AddressZero ? 'BNB' : 'Unknown';
  };

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

  const tableClick = (table: TableT, tableIndex: number) => {
    if (table.numberOfPlayers === '0') {
      joinGame?.({
        recklesslySetUnpreparedArgs: [BigNumber.from(tableIndex), BigNumber.from('0')],
        recklesslySetUnpreparedOverrides: {
          value: ethers.utils.parseEther((parseFloat(formatBuyIn(table)) + parseFloat(minBuyIn)).toString()),
        },
      });
    } else {
      const path = '/predictionmarket/games/' + table.gameID;
      router.push(path);
      // joinGame?.({
      //   recklesslySetUnpreparedArgs: [BigNumber.from(tableIndex), BigNumber.from('0')],
      //   recklesslySetUnpreparedOverrides: {
      //     value: ethers.utils.parseEther((parseFloat(formatBuyIn(table)) + parseFloat(minBuyIn)).toString()),
      //   },
      // });
    }
  };

  const timeRemainingString = (table: TableT) => {
    if (table.numberOfPlayers === '0') {
      return 'Start Game';
    } else {
      return 'Join or Spectate Game';
    }
  };

  // Event handler to update the selected value
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTableCurrency(event.target.value);
  };

  return (
    <Page showConnectButton={true} showNav={false} showAppFooter={false} showAppHeader={false}>
      <div
        className={`${sidebarStateActive ? 'sidebarActive' : 'transition-all duration-300'} min-h-screen gameBGImage`}
      >
        <div className="mt-60 mb-12 mx-[4.5rem]">
          <section
            className={`${
              sidebarStateActive ? 'contentContainerWithSidebarNoBG' : 'contentContainerWithoutSidebarNoBG'
            } mb-32`}
          >
            {/* game introduction section */}
            {/* left side */}
            <div className="basis-3/4">
              <p className="title28">
                <span className="text-[48px] font-thin text-brand-green">Prediction Market</span> takes your bets and
                rewards up or down. Dive into the world of digital assets and test your intuition - will your chosen
                token rise (&apos;Up&apos;) or fall (&apos;Down&apos;) in value? It&apos;s an engaging way to explore
                the dynamic crypto market without risking real money. Make your predictions and see if you&apos;ve got
                what it takes to anticipate the crypto rollercoaster. Have fun while honing your crypto-savvy skills in
                the Crypto Price Prediction Market!
              </p>
            </div>
            {/* right side */}
            <div className="basis-1/4">
              {/* responsive border */}
              <div className={`mx-2 border-l-2 h-full my-auto hidden ${sidebarStateActive ? 'xl:block' : 'lg:block'}`}>
                <div className="ml-8">
                  <p className="title32">Details: </p>
                  <p className="text-[24px] font-light">3 - 6 Players</p>
                </div>
              </div>
              <div className={`my-2 border-t-2 w-full mx-auto block ${sidebarStateActive ? 'xl:hidden' : 'lg:hidden'}`}>
                <div className="mt-8">
                  <p className="title32">Details: </p>
                  <p className="text-[24px] font-light">3 - 6 Players</p>
                </div>
              </div>
            </div>
          </section>
          <div className="flex gap-4 align-middle mb-10">
            <h4 className="text-brand-green">Join a Market </h4>
            <select
              className="h-12 my-auto rounded-lg bg-slate-main flex justify-evenly"
              placeholder="ETH"
              value={tableCurrency}
              onChange={handleSelectChange}
            >
              <option value="">Select a currency: </option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
          <section
            className={`${
              sidebarStateActive ? 'contentContainerWithSidebarNoBG' : 'contentContainerWithoutSidebarNoBG'
            }`}
          >
            {/* table selection section */}
            <div className="w-full text-xl tableGrid min-h-[280px]">
              {tables.map((table, i) => {
                return (
                  <div className="bg-slate-main rounded-lg p-8 flex flex-col" key={i}>
                    <p className="text-2xl font-medium mb-8">Table {i + 1}</p>
                    <div className="mr-4 flex justify-between text-xl">
                      <p className="font-medium">Buy In: </p>
                      <p className="font-light">
                        {formatBuyIn(table)} {tokenName(table)}
                      </p>
                    </div>
                    <div className="mr-4 flex justify-between text-xl">
                      <p className="font-medium">Players: </p>
                      <p className="font-light">
                        {table.numberOfPlayers}/{table.maxPlayers}
                      </p>
                    </div>
                    <div className="mt-12 mx-4" onClick={() => tableClick(table, i + 1)}>
                      <ActionButtonItem text={timeRemainingString(table)} color={'blue'} link={''} />
                    </div>
                  </div>
                );
              })}

              {isConnected && (
                <Link
                  href={'/roulette/history'}
                  className="cursor-pointer border border-solid border-white text-center mt-10 flex flex-col p-4"
                >
                  View Game History
                </Link>
              )}
            </div>
            {/* </PageContent> */}
          </section>
          <div className="flex justify-center mx-auto max-w-[245px]">
            <ActionButtonItem text="Enter Prediction Market" color="blue" link="predictionmarket/play" />
          </div>
        </div>
      </div>
    </Page>
  );
}
