import Page from '@/components/page';
import ActionButtonItem from '../../components/buttons/ActionButton';
import {useSidebar} from '@/contexts/SidebarContext';

export default function Points() {
  const sidebarStateActive = useSidebar();

  return (
    <Page showConnectButton={true} showNav={false} showAppFooter={false} showAppHeader={false}>
      <div className={`${sidebarStateActive ? 'sidebarActive' : 'sidebarSmall'}`}>
        <div className="mt-24 mx-[4.5rem]">
          <h4 className="text-brand-green mb-11">Points</h4>
          <section className={`flex flex-col ${sidebarStateActive ? 'lg:flex-row gap-8' : 'md:flex-row gap-8'}`}>
            {/* left col */}
            <div className={`basis-1/2`}>
              <div className="w-44 rounded-lg border-gray-700 border-2 text-center mb-3">
                <p className="title20 py-4">Swap</p>
              </div>

              {/* TODO: TURN INTO COMPONENT WHEN DESIGNS ARE DONE */}
              <div className="h-44 bg-slate-light rounded-lg px-5 flex justify-between align-middle mb-2">
                <div className="my-auto">
                  <p className="title24">You Pay</p>
                  <p className="text-[36px] font-medium">0</p>
                </div>
                <select className="h-12 my-auto rounded-lg bg-slate-main flex justify-evenly" placeholder="ETH">
                  <option className="title24">ETH</option>
                </select>
              </div>

              {/* TODO: TURN INTO COMPONENT WHEN DESIGNS ARE DONE */}
              <div className="h-44 bg-slate-light rounded-lg px-5 flex justify-between align-middle">
                <div className="my-auto">
                  <p className="title24">You Will Receive</p>
                  <p className="text-[36px] font-medium">0</p>
                </div>
                <select className="h-12 my-auto rounded-lg bg-slate-main flex justify-evenly" placeholder="Points">
                  <option className="title24">Points</option>
                </select>
              </div>

              <div className="my-6">
                <ActionButtonItem text="Swap" color="blue" link="" />
              </div>
            </div>
            {/* right col */}
            <div className={`basis-1/2`}>
              <div className="w-44 rounded-lg border-gray-700 border-2 text-center mb-3">
                <p className="title20 py-4">Add Liquidity</p>
              </div>

              {/* TODO: TURN INTO COMPONENT WHEN DESIGNS ARE DONE */}
              <div className="h-44 bg-slate-light rounded-lg px-5 flex justify-between align-middle mb-2">
                <div className="my-auto">
                  <p className="title24">You Pay</p>
                  <p className="text-[36px] font-medium">0</p>
                </div>
                <select className="h-12 my-auto rounded-lg bg-slate-main flex justify-evenly" placeholder="ETH">
                  <option className="title24">ETH</option>
                </select>
              </div>

              {/* TODO: TURN INTO COMPONENT WHEN DESIGNS ARE DONE */}
              <div className="h-44 bg-slate-light rounded-lg px-5 flex justify-between align-middle">
                <div className="my-auto">
                  <p className="title24">You Pay</p>
                  <p className="text-[36px] font-medium">0</p>
                </div>
                <select className="h-12 my-auto rounded-lg bg-slate-main flex justify-evenly" placeholder="ETH">
                  <option className="title24">ETH</option>
                </select>
              </div>

              <div className="my-6">
                <ActionButtonItem text="Add" color="blue" link="" />
              </div>
            </div>
          </section>
          <section className={`mb-6 px-4 gap-8 max-w-6xl py-6 flex`}>
            <div className="basis-1/2 bg-slate-light rounded-lg">
              <p className="body16Medium mx-6 mt-6">How it works</p>
              <p className="title24 m-6">
                When you buy points there is a randomized +50% to -50% chance of how many points you will receive.
                Points can be used to play games, join the lottery, or be placed into the revenue pool to generate money
                as the house.
              </p>
            </div>
            <div className="basis-1/2"></div>
          </section>
        </div>
      </div>
    </Page>
  );
}
