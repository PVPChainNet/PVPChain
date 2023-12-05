import Image from 'next/image';
import Page from '@/components/page';
import {useSidebar} from '@/contexts/SidebarContext';
import {useState} from 'react';
import Link from 'next/link';
import Countdown from '../../components/countdown';

export default function TokenLeaderboard() {
  const sidebarStateActive = useSidebar();
  const [selectedTab, setSelectedTab] = useState('This Month');

  const countdownEndDate = new Date('January 1, 2024 00:00:00');

  //called when countdown reaches 0 (from Countdown child component)
  const countdownEnd = () => {
    console.log('countdown ended');
    // return new Date('February 1, 2024 00:00:00');
  };

  return (
    <Page showConnectButton={true} showNav={false} showAppFooter={false} showAppHeader={false}>
      <div className={`${sidebarStateActive ? 'sidebarActive' : 'sidebarSmall'}`}>
        <div className="mt-24 mb-12 mx-[4.5rem]">
          <h4 className="text-brand-green mb-5">Token Leaderboard</h4>
          <Link
            href="/playerleaderboard"
            className="px-6 py-2 rounded-lg bg-slate-light text-[16px] cursor-pointer text-white-main hover:bg-black-main"
          >
            View Player Leaderboard
          </Link>
          <section
            className={`px-4 ${sidebarStateActive ? 'contentContainerWithSidebar' : 'contentContainerWithoutSidebar'}`}
          ></section>

          {/* info section about selected table view */}
          <div className="mt-12 mb-20 flex flex-col md:flex-row justify-start gap-8">
            <div className="">
              <p className="title32 mx-auto">How Ranks are Calculated </p>
              <p className="mt-7 text-[20px] font-normal mx-auto max-w-[620px]">info</p>
            </div>
            <div className="">
              <p className="title32 mx-auto">Payout Distributions </p>
              <p className="mt-7 text-[20px] font-normal mx-auto max-w-[620px]">info</p>
            </div>
          </div>

          {/* claim and game history view toggle buttons */}
          <div className="flex justify-center gap-4 mt-5">
            <button
              onClick={() => setSelectedTab('This Month')}
              className={`h-12 w-36 rounded-3xl bg-slate-light text-[20px] text-white-main hover:bg-black-main ${
                selectedTab === 'This Month' ? 'font-medium border-2 border-brand-green' : 'font-light'
              }`}
            >
              This Month
            </button>
            <button
              onClick={() => setSelectedTab('Lifetime')}
              className={`h-12 w-40 rounded-3xl bg-slate-light text-[20px] text-white-main hover:bg-black-main ${
                selectedTab === 'Lifetime' ? 'font-medium border-2 border-brand-green' : 'font-light'
              }`}
            >
              Lifetime
            </button>
          </div>

          {/* if view is weekly, show countdown component */}
          {selectedTab === 'This Month' && (
            <div className="mt-11 w-full">
              <Countdown targetDate={countdownEndDate} onCountdownEnd={countdownEnd} />
            </div>
          )}

          {/* table bg */}
          <div className="mt-7 pb-4 w-full px-10 bg-slate-light rounded-3xl">
            {selectedTab === 'This Month' ? (
              <table className="w-full max-h-[1200px] overflow-scroll text-center table-auto">
                <tr className="border-b-2 border-black-dark border-opacity-50 h-20 body18 font-medium">
                  <th>Rank</th>
                  <th>Token</th>
                  <th>Amount Bet</th>
                </tr>
                <tr className="text-brand-orange h-32 text-[40px] font-medium border-b-2 border-black-dark border-opacity-50">
                  <td>1</td>
                  <td>DOGE</td>
                  <td>8,000</td>
                </tr>
                <tr className="text-[36px] h-28 font-medium border-b-2 border-black-dark border-opacity-50">
                  <td>2</td>
                  <td>DOGE</td>
                  <td>6,000</td>
                </tr>
                <tr className="text-[32px] h-24 font-medium border-b-2 border-black-dark border-opacity-50">
                  <td>3</td>
                  <td>DOGE</td>
                  <td>4,000</td>
                </tr>
                <tr className="text-[28px] h-20 font-medium border-b-2 border-black-dark border-opacity-50">
                  <td>4</td>
                  <td>DOGE</td>
                  <td>2,000</td>
                </tr>
                <tr className="text-[24px] h-16 font-medium">
                  <td>5</td>
                  <td>DOGE</td>
                  <td>1,000</td>
                </tr>
                {/* remaining rows are 54px tall with a 20pt font */}
              </table>
            ) : (
              <table className="w-full max-h-[1200px] overflow-scroll text-center table-auto">
                <tr className="border-b-2 border-black-dark border-opacity-50 h-20 body18 font-medium">
                  <th>Rank</th>
                  <th>Token</th>
                  <th>Amount Bet</th>
                </tr>
                <tr className="text-brand-orange h-32 text-[40px] font-medium border-b-2 border-black-dark border-opacity-50">
                  <td>1</td>
                  <td>BTC</td>
                  <td>28,000</td>
                </tr>
                <tr className="text-[36px] h-28 font-medium border-b-2 border-black-dark border-opacity-50">
                  <td>2</td>
                  <td>BTC</td>
                  <td>26,000</td>
                </tr>
                <tr className="text-[32px] h-24 font-medium border-b-2 border-black-dark border-opacity-50">
                  <td>3</td>
                  <td>BTC</td>
                  <td>14,000</td>
                </tr>
                <tr className="text-[28px] h-20 font-medium border-b-2 border-black-dark border-opacity-50">
                  <td>4</td>
                  <td>BTC</td>
                  <td>6,000</td>
                </tr>
                <tr className="text-[24px] h-16 font-medium">
                  <td>5</td>
                  <td>BTC</td>
                  <td>5,000</td>
                </tr>
                {/* remaining rows are 54px tall with a 20pt font */}
              </table>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
}
