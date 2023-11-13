import Page from '@/components/page';
import ActionButtonItem from '../../../components/buttons/ActionButton';
import {useSidebar} from '@/contexts/SidebarContext';

export default function PlayCoinFlip() {
  const sidebarStateActive = useSidebar();

  return (
    <Page showConnectButton={true} showNav={false} showAppFooter={false} showAppHeader={false}>
      <div
        className={`${sidebarStateActive ? 'sidebarActive' : 'transition-all duration-300'} min-h-screen gameBGImage`}
      >
        <div className="mt-24 mx-[4.5rem]">
          <h4 className="text-brand-green mb-32">Play Coin Flip</h4>
          <section
            className={`${
              sidebarStateActive ? 'contentContainerWithSidebarNoBG' : 'contentContainerWithoutSidebarNoBG'
            } mb-24`}
          >
            <p>game</p>
          </section>
        </div>
      </div>
    </Page>
  );
}
