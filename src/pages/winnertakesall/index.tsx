import {NextPage} from 'next';

import PageContent from '@/components/page/content';
import Page from '@/components/page';
import {useState} from 'react';

import {WinnerTakesAll} from '../../typescript/contracts';
import {useAccount, useContractRead, useContractWrite} from 'wagmi';
import {BigNumber, ethers} from 'ethers';
import {toast} from 'react-toastify';
import {useRouter} from 'next/router';
import Link from 'next/link';

import {useSidebar} from '@/contexts/SidebarContext';
import ActionButtonItem from '../../components/buttons/ActionButton';

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
  const sidebarStateActive = useSidebar();

  const {isConnected} = useAccount();

  const router = useRouter();

  const [tables, setTables] = useState<TableT[]>([]);
  const [minBuyIn, setMinBuyIn] = useState<string>('');
  const [tableCurrency, setTableCurrency] = useState<string>('');

  const readConfig = {
    address: WinnerTakesAll.address,
    abi: WinnerTakesAll.abi,
    chainId: WinnerTakesAll.chainId,
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
      const path = '/winnertakesall/games/' + table.gameID;
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
    router.push('/russianroulette/history');
  };

  // Event handler to update the selected value
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTableCurrency(event.target.value);
  };

  return (
    <Page showConnectButton={true} showNav={false} showAppFooter={false} showAppHeader={false}>
      <div className={`${sidebarStateActive ? 'sidebarActive' : 'sidebarSmall'} gameBGImage`}>
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
                <span className="text-[48px] font-thin text-brand-green">Winner Takes All</span> is a self-contained
                lottery where one player wins big. In this game, players take turns pulling the trigger. Test your luck,
                place fun wagers, and enjoy the suspense as you pray to live another day - it&apos;s all in good fun,
                and your the odds are in your favor!
              </p>
            </div>
            {/* right side */}
            <div className="basis-1/4">
              {/* responsive border */}
              <div className={`mx-2 border-l-2 h-full my-auto hidden ${sidebarStateActive ? 'xl:block' : 'lg:block'}`}>
                <div className="ml-8">
                  <p className="title32">Details: </p>
                  <p className="text-[24px] font-light">Minimum of 3 Players</p>
                  <p className="text-[24px] font-light">No Upper Limit of Players</p>
                </div>
              </div>
              <div className={`my-2 border-t-2 w-full mx-auto block ${sidebarStateActive ? 'xl:hidden' : 'lg:hidden'}`}>
                <div className="mt-8">
                  <p className="title32">Details: </p>
                  <p className="text-[24px] font-light">Minimum of 3 Players</p>
                  <p className="text-[24px] font-light">No Upper Limit of Players</p>
                </div>
              </div>
            </div>
          </section>
          <div className="flex gap-4 align-middle mb-10">
            <h4 className="text-brand-green">Join a Table </h4>
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
                //   return (
                //     <div
                //       className="cursor-pointer border border-solid border-white text-center m-10 flex flex-col p-4"
                //       key={i}
                //       onClick={() => tableClick(table, i + 1)}
                //     >
                //       <code className="mb-5">Table {i + 1}</code>
                //       <code>
                //         Buy In: {formatBuyIn(table)} {tokenName(table)}
                //       </code>
                //       <code>
                //         Players: {table.numberOfPlayers}/{table.maxPlayers}
                //       </code>
                //       <code>{timeRemainingString(table)}</code>
                //     </div>
                //   );
                // })}
                return (
                  <div className="bg-slate-main rounded-lg p-8 flex flex-col" key={i}>
                    <p className="text-2xl font-medium mb-8">Table {i + 1}</p>
                    <div className="mr-4 flex justify-between text-xl">
                      <p className="font-medium">Total Pot: </p>
                      <p className="font-light">$20,000</p>
                    </div>
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
                    <div className="mr-4 flex justify-between text-xl">
                      <p className="font-medium">Risk Points: </p>
                      <p className="font-light">10</p>
                    </div>
                    <div className="mt-12 mx-4" onClick={() => tableClick(table, i + 1)}>
                      <ActionButtonItem text={timeRemainingString(table)} color={'blue'} link={''} />
                    </div>
                  </div>
                );
              })}

              {isConnected && (
                <Link
                  href={'/winnertakesall/history'}
                  className="cursor-pointer border border-solid border-white text-center m-10 flex flex-col p-4"
                >
                  View Game History
                </Link>
              )}
            </div>
          </section>
          {/* <Link href={'/'} className="border border-white p-2 absolute bottom-4">
            Go Back
          </Link> */}
        </div>
      </div>
    </Page>
  );
};

export default Home;
