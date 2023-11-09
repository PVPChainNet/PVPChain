import Page from '@/components/page';
import {useSidebar} from '@/contexts/SidebarContext';
import ActionButtonItem from '../../components/buttons/ActionButton';

export default function PredictionMarket() {
  const sidebarStateActive = useSidebar();

  return (
    <Page showConnectButton={true} showNav={false} showAppFooter={false} showAppHeader={false}>
      <div className={`${sidebarStateActive ? 'sidebarActive' : 'transition-all duration-300'}`}>
        <div className="mt-24 mx-[4.5rem]">
          <h4 className="text-brand-green mb-11">Prediction Market</h4>
          <ActionButtonItem text="Enter Prediction Market" color="blue" link="predictionmarket/play" />
        </div>
      </div>
    </Page>
  );
}
