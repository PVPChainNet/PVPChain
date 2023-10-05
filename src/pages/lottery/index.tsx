import Page from '@/components/page';
import ActionButtonItem from '../../components/buttons/ActionButton';
import {useSidebar} from '@/contexts/SidebarContext';

export default function Lottery() {
  const sidebarStateActive = useSidebar();

  return (
    <Page showConnectButton={true} showNav={false} showAppFooter={false} showAppHeader={false}>
      <div className={`${sidebarStateActive ? 'sidebarActive' : 'transition-all duration-300'}`}>
        <div className="mt-24 mx-[4.5rem]">
          <h4 className="text-brand-green mb-11">The Lottery</h4>
          <section
            className={`rounded-lg bg-slate-light flex flex-col ${
              sidebarStateActive ? 'xl:flex-row' : 'lg:flex-row'
            } justify-around gap-8 max-w-6xl`}
          >
            {/* left col */}
            <div className="flex flex-col ml-16 my-16">
              <p className="title24">Current Jackpot</p>
              <h1>$1,200,550.40</h1>
              <p className="title20">Next drawing at 12:00 GMT</p>
              <p className="title20">My Current Tickets: 126</p>
            </div>
            {/* right col */}
            <div className="flex flex-col mr-16 my-16">
              <p className="title24">Ticket Rates</p>
              <div className="flex flex-row mt-6">
                <input
                  type="text"
                  className="basis-3/4 bg-slate-main text-white-main border border-slate-accent rounded-lg p-2 mb-4"
                  placeholder="# of tickets"
                />
                <select
                  name="Currency"
                  className="basis-1/4 bg-slate-main text-gray-500 border border-slate-accent rounded-lg p-2 mb-4 caret-brand-green"
                >
                  <option value="" disabled selected hidden className="">
                    Currency
                  </option>
                  <option value="bnb">BNB</option>
                  <option value="wbnb">WBNB</option>
                  <option value="usd">USD</option>
                </select>
              </div>
              <ActionButtonItem text="Buy" color="blue" link="" />
              <div className="flex flex-row justify-between align-middle gap-4 mt-5">
                <p className="bg-slate-main rounded-lg px-2">1 Ticket - .025 BNB</p>
                <p className="bg-slate-main rounded-lg px-2">1 Ticket - .015 WBNB</p>
                <p className="bg-slate-main rounded-lg px-2">1 Ticket - $1 USD</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Page>
  );
}
