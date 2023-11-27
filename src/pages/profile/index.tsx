import Image from 'next/image';
import Page from '@/components/page';
import {useSidebar} from '@/contexts/SidebarContext';
import {useState} from 'react';
import ClaimModal from '../../components/modals/claim';

export default function Profile() {
  const sidebarStateActive = useSidebar();

  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <Page showConnectButton={true} showNav={false} showAppFooter={false} showAppHeader={false}>
      <div className={`${sidebarStateActive ? 'sidebarActive' : 'sidebarSmall'}`}>
        <div className="mt-24 mx-[4.5rem]">
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
                <p className="title24">Current points earned</p>
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
                <p className="title24">Lifetime points earned</p>
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
                <p className="title24">Money Spent</p>
              </div>
            </div>
          </section>

          <table className="w-full mt-24">
            <tr className="text-left border-gray-600 border-b-2 border-opacity-50 h-20 body18 font-medium">
              <th>Game History</th>
              <th>Date Played</th>
              <th>Amount Spent</th>
              <th>Win / Loss</th>
            </tr>
            <tr className="text-left border-gray-600 border-b-2 border-opacity-20 h-20 body18 font-medium">
              <td>Winner Takes All</td>
              <td>Nov 22, 2023</td>
              <td>$130.03</td>
              <td className="mx-auto">
                <button
                  onClick={handleOpenModal}
                  className="h-11 w-full max-w-[140px] text-black-dark rounded-3xl border-2 border-white-main bg-gradient-to-r from-brand-purple to-[#CCBED3]"
                >
                  Claim
                </button>
                {isModalOpen && <ClaimModal onClose={handleCloseModal} onAction={handleAction} />}
              </td>
            </tr>
            <tr className="text-left border-gray-600 border-b-2 border-opacity-20 h-20 body18 font-medium">
              <td>Wheel of Fortune</td>
              <td>Sept 10, 2023</td>
              <td>$130.03</td>
              <td className="mx-auto">
                <Image src="/images/icons/win_icon.png" width={40} height={40} alt="Win icon" />
              </td>
            </tr>
            <tr className="text-left border-gray-600 border-b-2 border-opacity-20 h-20 body18 font-medium">
              <td>Prediction Market</td>
              <td>Mar 20, 2022</td>
              <td>$110.50</td>
              <td className="mx-auto">
                <Image src="/images/icons/lose_icon.png" width={40} height={40} alt="Lose icon" />
              </td>
            </tr>
            <tr className="text-left h-20 body18 font-medium">
              <td>Russian Roulette</td>
              <td>Jan 12, 2022</td>
              <td>$1100.00</td>
              <td className="mx-auto">
                <Image src="/images/icons/win_icon.png" width={40} height={40} alt="Win icon" />
              </td>
            </tr>
          </table>
        </div>
      </div>
    </Page>
  );
}
