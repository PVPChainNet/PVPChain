import Page from '@/components/page';
import ActionButtonItem from '../../components/buttons/ActionButton';
import {useSidebar} from '@/contexts/SidebarContext';

export default function WheelOfFortune() {
  const sidebarStateActive = useSidebar();

  return (
    <Page showConnectButton={true} showNav={false} showAppFooter={false} showAppHeader={false}>
      <div className={`${sidebarStateActive ? 'sidebarActive' : 'sidebarSmall'} min-h-screen gameBGImage`}>
        <div className="mt-24 mx-[4.5rem]">
          <h4 className="text-brand-green mb-32">Wheel of Fortune</h4>
          <section
            className={`${
              sidebarStateActive ? 'contentContainerWithSidebarNoBG' : 'contentContainerWithoutSidebarNoBG'
            } mb-24`}
          >
            {/* game introduction section */}
            {/* left side */}
            <div className="basis-3/4">
              <p className="title28">
                <span className="text-[48px] font-thin text-brand-green">Wheel of Fortune</span> takes your bets and
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
          <div className="flex justify-center mx-auto max-w-[245px]">
            <ActionButtonItem text="Play Wheel of Fortune" color="blue" link="wheeloffortune/play" />
          </div>
        </div>
      </div>
    </Page>
  );
}
