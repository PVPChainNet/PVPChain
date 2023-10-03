import {NextPage} from 'next';
import Link from 'next/link';

// import PageContent from '@/components/page/content';
import Page from '@/components/page';

const Home: NextPage = () => {
  return (
    <Page showConnectButton={true} showNav={false} showAppFooter={false} showAppHeader={false}>
      <div /* className="ml-[300px]" */>
        <div className="relative mt-28 ml-12">
          <h2>
            The world&apos;s first <span className="text-brand-green">decentralized</span>,{' '}
            <span className="text-brand-green">trustless</span>, fully{' '}
            <span className="text-brand-green">on-chain</span> casino.
          </h2>
        </div>

        <div className="w-full text-xl text-brand-8 flex flex-col items-center">
          <Link href={'/roulette'} className="border border-white p-4 mb-8">
            Russian Roulette
          </Link>
          <Link href={'/winnertakesall'} className="border border-white p-4">
            Winner Takes All
          </Link>
        </div>
      </div>
    </Page>
  );
};

export default Home;
