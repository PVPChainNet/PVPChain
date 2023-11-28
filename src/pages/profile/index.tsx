import Image from 'next/image';
import Page from '@/components/page';
import {useSidebar} from '@/contexts/SidebarContext';
import {useState} from 'react';
import ClaimModal from '../../components/modals/claim';
import {useRouter} from 'next/router';

export default function Profile() {
  const router = useRouter();

  const sidebarStateActive = useSidebar();

  const [selectedTab, setSelectedTab] = useState('Claim');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const claimInfo = 'claim info text ...';
  const gameHistoryInfo = 'game history text ...';

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAction = () => {
    // Perform your action here
    // ...
    // Close the modal
    // handleCloseModal();
  };

  function handleRowClick(link: string): void {
    router.push(link);
  }

  return (
    <Page showConnectButton={true} showNav={false} showAppFooter={false} showAppHeader={false}>
      <div className={`${sidebarStateActive ? 'sidebarActive' : 'sidebarSmall'}`}>
        <div className="mt-24 mb-12 mx-[4.5rem]">
          <h4 className="text-brand-green mb-11">Profile</h4>
          <section
            className={`px-4 ${sidebarStateActive ? 'contentContainerWithSidebar' : 'contentContainerWithoutSidebar'}`}
          >
            <div
              className={`rounded-lg bg-slate-light max-w-7xl flex flex-col w-full ${
                sidebarStateActive ? 'lg:flex-row justify-around' : 'md:flex-row justify-around'
              }`}
            >
              <div
                className={`flex flex-col justify-evenly my-12 mx-auto ${
                  sidebarStateActive ? 'lg:mx-none' : 'md:mx-none'
                }`}
              >
                <p className="text-[32px] font-medium">12,012</p>
                <p className="title24">Total Bet</p>
              </div>

              <div
                className={`mx-2 border-l-2 h-28 opacity-20 my-auto hidden ${
                  sidebarStateActive ? 'lg:block' : 'md:block'
                }`}
              ></div>
              <div
                className={`my-2 border-b-2 w-4/5 opacity-20 mx-auto block ${
                  sidebarStateActive ? 'lg:hidden' : 'md:hidden'
                }`}
              ></div>

              <div
                className={`flex flex-col justify-evenly my-12 mx-auto ${
                  sidebarStateActive ? 'lg:mx-none' : 'md:mx-none'
                }`}
              >
                <p className="text-[32px] font-medium">123,987</p>
                <p className="title24">Total Received</p>
              </div>

              <div
                className={`mx-2 border-l-2 h-28 opacity-20 my-auto hidden ${
                  sidebarStateActive ? 'lg:block' : 'md:block'
                }`}
              ></div>
              <div
                className={`my-2 border-b-2 w-4/5 opacity-20 mx-auto block ${
                  sidebarStateActive ? 'lg:hidden' : 'md:hidden'
                }`}
              ></div>

              <div
                className={`flex flex-col justify-evenly my-12 mx-auto ${
                  sidebarStateActive ? 'lg:mx-none' : 'md:mx-none'
                }`}
              >
                <p className="text-[32px] font-medium">$1,003.06</p>
                <p className="title24">Games Played</p>
              </div>
            </div>
          </section>

          {/* info section about selected table view */}
          <div className="mt-16 mb-14 flex flex-col justify-center">
            <p className="title32 mx-auto">{selectedTab}</p>
            <p className="mt-7 text-[20px] font-normal mx-auto max-w-[620px]">
              {selectedTab === 'Claim' ? claimInfo : gameHistoryInfo}
            </p>
          </div>

          {/* claim and game history view toggle buttons */}
          <div className="flex justify-center gap-4 mt-5">
            <button
              onClick={() => setSelectedTab('Claim')}
              className={`h-12 w-36 rounded-3xl bg-slate-light text-[20px] text-white-main ${
                selectedTab === 'Claim' ? 'font-medium border-2 border-brand-green' : 'font-light'
              }`}
            >
              Claim
            </button>
            <button
              onClick={() => setSelectedTab('Game History')}
              className={`h-12 w-40 rounded-3xl bg-slate-light text-[20px] text-white-main ${
                selectedTab === 'Game History' ? 'font-medium border-2 border-brand-green' : 'font-light'
              }`}
            >
              Game History
            </button>
          </div>

          {/* claim table */}
          {selectedTab === 'Claim' && (
            <table className="w-full mt-16 max-h-[1200px] overflow-scroll">
              <tr className="text-left border-gray-600 border-b-2 border-opacity-50 h-20 body18 font-medium">
                <th>Game</th>
                <th>Amount Total</th>
                <th>Amount Claimed</th>
                <th>Remaining</th>
                <th>Claim</th>
              </tr>
              {/* TODO: map through claim data and display here (filter game history) */}
              <tr className="text-left border-gray-600 border-b-2 border-opacity-20 h-20 body18 font-medium">
                <td>Winner Takes All</td>
                <td>.0624 BNB</td>
                <td>.0099 BNB</td>
                <td>.0525 BNB</td>
                <td className="mx-auto">
                  {/* TODO: if remaining is > 0, show claim button */}
                  <button
                    onClick={handleOpenModal}
                    className="h-11 w-full max-w-[140px] text-black-dark rounded-3xl border-2 border-white-main bg-gradient-to-r from-brand-purple to-[#CCBED3]"
                  >
                    Claim
                  </button>
                  {isModalOpen && <ClaimModal onClose={handleCloseModal} onAction={handleAction} />}
                  {/* TODO: else, remaining is 0. show claimed button */}
                  {/* <div className="flex justify-center items-center h-11 w-full max-w-[140px] text-white-main rounded-3xl border-2 border-slate-accent bg-slate-light">
                    <p className="">Claimed</p>
                  </div> */}
                </td>
              </tr>
            </table>
          )}

          {/* game history table */}
          {selectedTab === 'Game History' && (
            <table className="w-full mt-16 max-h-[1200px] overflow-scroll">
              <tr className="text-left border-gray-600 border-b-2 border-opacity-50 h-20 body18 font-medium">
                <th>Game</th>
                <th>Date Played</th>
                <th>Amount Spent</th>
                <th>Result</th>
              </tr>
              {/* TODO: map through game history data and display here */}
              <tr
                onClick={() => handleRowClick('#')}
                className="cursor-pointer text-left border-gray-600 border-b-2 border-opacity-20 h-20 body18 font-medium"
              >
                <td>Wheel of Fortune</td>
                <td>Sept 10, 2023</td>
                <td>$130.03</td>
                <td className="mx-auto">
                  <Image src="/images/icons/win_icon.png" width={40} height={40} alt="Win icon" />
                </td>
              </tr>
              <tr
                onClick={() => handleRowClick('#')}
                className="cursor-pointer text-left border-gray-600 border-b-2 border-opacity-20 h-20 body18 font-medium"
              >
                <td>Prediction Market</td>
                <td>Mar 20, 2022</td>
                <td>$110.50</td>
                <td className="mx-auto">
                  <Image src="/images/icons/lose_icon.png" width={40} height={40} alt="Lose icon" />
                </td>
              </tr>
              <tr onClick={() => handleRowClick('#')} className="cursor-pointer text-left h-20 body18 font-medium">
                <td>Russian Roulette</td>
                <td>Jan 12, 2022</td>
                <td>$1100.00</td>
                <td className="mx-auto">
                  <Image src="/images/icons/win_icon.png" width={40} height={40} alt="Win icon" />
                </td>
              </tr>
            </table>
          )}
        </div>
      </div>
    </Page>
  );
}
