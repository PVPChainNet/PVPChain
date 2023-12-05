import Page from '@/components/page';
import ActionButtonItem from '../../components/buttons/ActionButton';
import {useSidebar} from '@/contexts/SidebarContext';

export default function Swap() {
  const sidebarStateActive = useSidebar();

  return (
    <Page showConnectButton={true} showNav={false} showAppFooter={false} showAppHeader={false}>
      <div className={`${sidebarStateActive ? 'sidebarActive' : 'sidebarSmall'}`}>
        <div className="mt-24 mx-[4.5rem]">
          <h4 className="text-brand-green mb-11">Swap</h4> {/* page title */}
          <section className={`mb-6 gap-8 max-w-3xl flex`}>
            <div className="">
              <p className="title32 mx-6 mt-6">How it works</p>
              <p className="title24 m-6">
                When you buy points there is a randomized +50% to -50% chance of how many points you will receive.
                Points can be used to play games, join the lottery, or be placed into the revenue pool to generate money
                as the house.
              </p>
            </div>
          </section>
          <div className="w-44 rounded-lg border-gray-700 border-2 text-center mb-3">
            {' '}
            {/* swap title */}
            <p className="title20 py-4">Swap Tokens</p>
          </div>
          <section
            className={`flex flex-col sm:flex-row max-w-[1000px] mx-auto mt-4 mb-8 gap-8 ${
              sidebarStateActive ? ' gap-8' : 'gap-8'
            }`}
          >
            {/* TODO: TURN INTO COMPONENT WHEN DESIGNS ARE DONE */}
            <div className="h-44 w-1/2 bg-slate-light rounded-lg px-5 flex justify-between align-middle mb-2">
              <div className="my-auto">
                <p className="title24">You Pay</p>
                <p className="text-[36px] font-medium">0</p>
              </div>
              <select className="h-12 my-auto rounded-lg bg-slate-main flex justify-evenly" placeholder="ETH">
                <option className="title24">ETH</option>
              </select>
            </div>

            <div className="flex justify-center items-center">
              <div className="h-[26px] rotate-180 arrow"></div>
            </div>

            {/* TODO: TURN INTO COMPONENT WHEN DESIGNS ARE DONE */}
            <div className="h-44 w-1/2 bg-slate-light rounded-lg px-5 flex justify-between align-middle">
              <div className="my-auto">
                <p className="title24">You Will Receive</p>
                <p className="text-[36px] font-medium">
                  0 <span className="text-[24px] font-light">BNB</span>
                </p>
              </div>
              {/* <select className="h-12 my-auto rounded-lg bg-slate-main flex justify-evenly" placeholder="Points">
                <option className="title24">Points</option>
              </select> */}
            </div>

            {/* <div className="my-6">
              <ActionButtonItem text="Swap" color="blue" link="" />
            </div> */}
            {/* right col */}
            {/* <div className={`basis-1/2`}>
              <div className="w-44 rounded-lg border-gray-700 border-2 text-center mb-3">
                <p className="title20 py-4">Add Liquidity</p>
              </div>

              {/* TODO: TURN INTO COMPONENT WHEN DESIGNS ARE DONE 
              <div className="h-44 bg-slate-light rounded-lg px-5 flex justify-between align-middle mb-2">
                <div className="my-auto">
                  <p className="title24">You Pay</p>
                  <p className="text-[36px] font-medium">0</p>
                </div>
                <select className="h-12 my-auto rounded-lg bg-slate-main flex justify-evenly" placeholder="ETH">
                  <option className="title24">ETH</option>
                </select>
              </div>

              {/* TODO: TURN INTO COMPONENT WHEN DESIGNS ARE DONE 
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
            </div> */}
          </section>
          <div className="my-6 max-w-[650px] mx-auto">
            <ActionButtonItem text="Swap" color="green" link="" />
          </div>
        </div>
      </div>
    </Page>
  );
}
