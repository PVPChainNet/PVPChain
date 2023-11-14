import {NextPage} from 'next';
import Link from 'next/link';
import Image from 'next/image';
// import PageContent from '@/components/page/content';
import Page from '@/components/page';
import {useSidebar} from '@/contexts/SidebarContext';

const Home: NextPage = () => {
  const sidebarStateActive = useSidebar();
  return (
    <Page showConnectButton={true} showNav={false} showAppFooter={false} showAppHeader={false}>
      <div className={`${sidebarStateActive ? 'sidebarActive' : 'transition-all duration-300'}`}>
        <div className="relative mt-28 mb-20 ml-12 max-w-4xl">
          <h2>
            The world&apos;s first <span className="text-brand-green">decentralized</span>,{' '}
            <span className="text-brand-green">trustless</span>, fully{' '}
            <span className="text-brand-green">on-chain</span> casino.
          </h2>
        </div>

        <section className="ml-12 relative">
          <p className="mb-6 text-2xl font-medium">PvP Games</p>

          {/* horizontal scroll button */}
          <div className="absolute top-[40%] right-7 bg-slate-main rounded-full w-12 h-12">
            <Image
              src="/images/icons/caret_darker_right.svg"
              width={8}
              height={8}
              alt="Arrow right"
              className="m-auto relative top-4"
            />
          </div>

          <div className="flex flex-row gap-6 mb-20 relative overflow-hidden hover:overflow-x-scroll">
            {/* map over pvp games */}
            <div className="min-w-[554px]">
              <Link href="/roulette">
                <Image
                  src="/images/games/russian_roulette/background.png"
                  width={554}
                  height={374}
                  alt="Russian Roulette background"
                />
                <p className="mt-5 body20">Russian Roulette</p>
              </Link>
            </div>
            <div className="min-w-[554px]">
              <Link href="/winnertakesall">
                <Image
                  src="/images/games/winner_takes_all/background.png"
                  width={554}
                  height={374}
                  alt="Winner Takes All background"
                />
                <p className="mt-5 body20">Winner Takes All</p>
              </Link>
            </div>
            <div className="min-w-[554px]">
              <Image
                src="/images/games/prediction_market/background.png"
                width={554}
                height={374}
                alt="Prediction Market background"
              />
              <p className="mt-5 body20">Prediction Market</p>
            </div>
            {/* <div className="min-w-[554px]">
              <Link href="/roulette">
                <Image
                  src="/images/games/russian_roulette/background.png"
                  width={554}
                  height={374}
                  alt="Russian Roulette background"
                />
                <p className="mt-5 body20">Russian Roulette</p>
              </Link>
            </div>
            <div className="min-w-[554px]">
              <Link href="/winnertakesall">
                <Image
                  src="/images/games/winner_takes_all/background.png"
                  width={554}
                  height={374}
                  alt="Winner Takes All background"
                />
                <p className="mt-5 body20">Winner Takes All</p>
              </Link>
            </div>
            <div className="min-w-[554px]">
              <Image
                src="/images/games/prediction_market/background.png"
                width={554}
                height={374}
                alt="Prediction Market background"
              />
              <p className="mt-5 body20">Prediction Market</p>
            </div> */}
          </div>

          <p className="mb-6 text-2xl font-medium">PvH Games</p>

          <div className="flex flex-row gap-6 mb-20 relative overflow-hidden hover:overflow-x-scroll">
            {/* map over pvp games */}
            <div className="min-w-[554px]">
              <Image
                src="/images/games/russian_roulette/background.png"
                width={554}
                height={374}
                alt="Russian Roulette background"
              />
              <p className="mt-5 body20">Wheel of Fortune</p>
            </div>
            <div className="min-w-[554px]">
              <Image
                src="/images/games/winner_takes_all/background.png"
                width={554}
                height={374}
                alt="Winner Takes All background"
              />
              <p className="mt-5 body20">Slots</p>
            </div>
            <div className="min-w-[554px]">
              <Image
                src="/images/games/prediction_market/background.png"
                width={554}
                height={374}
                alt="Prediction Market background"
              />
              <p className="mt-5 body20">Coin Flip</p>
            </div>
          </div>
        </section>
      </div>
    </Page>
  );
};

export default Home;
