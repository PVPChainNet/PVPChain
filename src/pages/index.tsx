import {NextPage} from 'next';
import Link from 'next/link';

import PageContent from '@/components/page/content';
import Page from '@/components/page';

const Home: NextPage = () => {
  return (
    <Page showConnectButton={true} showNav={false} showAppFooter={false} showAppHeader={false}>
      <PageContent contentPosition="center">
        <div className="absolute top-10 text-center">
          <h1 className="text-4xl font-bold mb-2">Welcome To Dappd Games</h1>
          <h5 className="text-2xl font-bold mb-24"> Select A Game To Play </h5>
        </div>

        <div className="w-full text-xl text-brand-8 flex flex-col items-center">
          <Link href={'/roulette'} className="border border-white p-4 mb-8">
            Russian Roulette
          </Link>
          <Link href={'/winnertakesall'} className="border border-white p-4">
            Winner Takes All
          </Link>
        </div>
      </PageContent>
    </Page>
  );
};

export default Home;
