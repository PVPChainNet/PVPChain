import {NextPage} from 'next';

//import PageContent from '@/components/page/content';
import Page from '@/components/page';
import {useState, useEffect} from 'react';

import {Game} from '../../typescript/contracts';
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
      return 'Join or Spectate Game';
    }
  };

  const tableClick = (table: TableT, tableIndex: number) => {
    //ensure that a currency is selected
    if (tableCurrency === '') {
      toast.error('Please select a currency');
      return;
    }

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

  useEffect(() => {
    // Check if there's a currency parameter in the URL
    const {currency} = router.query;
    // Update tableCurrency state if the currency parameter is present
    if (currency) {
      setTableCurrency(currency as string);
    }
  }, [router.query]); // Re-run the effect when the URL changes

  // Event handler to update the selected value
  const handleTableCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTableCurrency(event.target.value);
    // Update the URL with the new currency parameter
    router.push(`/russianroulette?currency=${event.target.value}`);
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
            {/* <PageContent contentPosition="center"> */}
            {/* game introduction section */}
            {/* left side */}
            <div className="basis-3/4">
              <p className="title28">
                <span className="text-[48px] font-thin text-brand-green">Russian Roulette</span> is a dangerous and
                deadly game of chance. In this game, players take turns pulling the trigger. Test your luck, place fun
                wagers, and enjoy the suspense as you pray to live another day - it&apos;s all in good fun, and your the
                odds are in your favor!
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
            <h4 className="text-brand-green">Join a Table </h4>
            <select
              className="h-12 my-auto rounded-lg bg-slate-main flex justify-evenly"
              placeholder="ETH"
              value={tableCurrency}
              onChange={handleTableCurrencyChange}
            >
              <option value="">Select a currency: </option>
              <option value="BNB">BNB</option>
              <option value="DOGE">DOGE</option>
              <option value="ETH">ETH</option>
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
                  href={'/roulette/history'}
                  className="cursor-pointer border border-solid border-white text-center mt-10 flex flex-col p-4"
                >
                  View Game History
                </Link>
              )}
            </div>
            {/* </PageContent> */}
          </section>
          {/* <Link href={'/'} className="border border-white p-2 mt-10 bottom-4">
            Go Back
          </Link> */}
        </div>
      </div>
    </Page>
  );
};

export default Home;
