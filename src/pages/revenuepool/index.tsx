import Page from '@/components/page';
import ActionButtonItem from '../../components/buttons/ActionButton';
import {useSidebar} from '@/contexts/SidebarContext';

export default function RevenuePool() {
  const sidebarStateActive = useSidebar();

  return (
    <Page showConnectButton={true} showNav={false} showAppFooter={false} showAppHeader={false}>
      <div className={`${sidebarStateActive ? 'sidebarActive' : 'transition-all duration-300'}`}>
        <div className="mt-24 mx-[4.5rem]">
          <h4 className="text-brand-green mb-11">Revenue Pool</h4>
          <section
            className={`${sidebarStateActive ? 'contentContainerWithSidebar' : 'contentContainerWithoutSidebar'}`}
          >
            {/* left col */}
            <div
              className={`${
                sidebarStateActive ? 'contentContainerColumnWithSidebar' : 'contentContainerColumnWithoutSidebar'
              }`}
            >
              <p className="title24 mb-6">Paid to Date</p>
              <h1>$143,200,550.40</h1>
              <div className="flex mt-3">
                <p className="bg-slate-main rounded-lg px-2">Minimum Points to Enter - 10,000</p>
              </div>
              <hr className="my-10 text-white-main opacity-20" />
              <p className="title24">Enter Revenue Pool</p>
              <div className="flex my-5">
                <input
                  type="text"
                  className="bg-slate-main text-white-main border border-slate-accent rounded-lg p-2 mb-4 w-full"
                  placeholder="# of points"
                />
              </div>
              <ActionButtonItem text="Buy" color="blue" link="" />
            </div>
            {/* right col */}
            <div
              className={`${
                sidebarStateActive ? 'contentContainerColumnWithSidebar' : 'contentContainerColumnWithoutSidebar'
              }`}
            >
              <div className="bg-slate-main rounded-lg">
                <p className="body16Medium mx-6 mt-6">How it works</p>
                <p className="title24 m-6">
                  The casino is constantly burning points. The revenue pool pays out a share of the burn and all other
                  revenue from the platform. But adding points to the pool, you gain a chance at the profit sharing from
                  the entire casino. Essentially, this allows you to be the house.
                </p>
              </div>
              <p className="title24 mt-16 mb-5">Total Points Burned</p>
              <h1>12,486,327</h1>
            </div>
          </section>
          <section className={`my-6 rounded-lg bg-slate-light gap-8 max-w-6xl py-6`}>
            <div className="flex justify-around">
              <p className="title24">Your Stake: </p>
              <p className="title24">10,000</p>
            </div>
            <hr className="my-10 text-white-main opacity-20 w-5/6 mx-auto" />
            <div className="flex justify-around">
              <p className="title24">Total Staked: </p>
              <p className="title24">10,000</p>
            </div>
            <hr className="my-10 text-white-main opacity-20 w-5/6 mx-auto" />
            <div className="flex justify-around">
              <p className="title24">Your Revenue Share:: </p>
              <p className="title24">5%</p>
            </div>
          </section>
        </div>
      </div>
    </Page>
  );
}
