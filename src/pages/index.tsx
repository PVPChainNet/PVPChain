import {NextPage} from 'next';
import Link from 'next/link';
import Image from 'next/image';
// import PageContent from '@/components/page/content';
import {menuItemsPVP, menuItemsPVH} from '../typescript/menuItems';
import Page from '@/components/page';
import {useSidebar} from '@/contexts/SidebarContext';
import Footer from '../components/footer';
import Reveal from '../components/utility/Reveal';

const Home: NextPage = () => {
  const sidebarStateActive = useSidebar();
  return (
    <Page showConnectButton={true} showNav={false} showAppFooter={false} showAppHeader={false}>
      <section className={`transition-all duration-300 ${sidebarStateActive ? 'ml-[324px]' : 'ml-[80px]'}`}>
        <div className="relative mt-28 mb-20 ml-12 max-w-4xl">
          <Reveal>
            <h2>
              The world&apos;s first <span className="text-brand-green">decentralized</span>,{' '}
              <span className="text-brand-green">trustless</span>, fully{' '}
              <span className="text-brand-green">on-chain</span> casino.
            </h2>
          </Reveal>
        </div>
      </section>

      <section className={`transition-all duration-300 ${sidebarStateActive ? 'ml-[324px]' : 'ml-[80px]'}`}>
        <div className="ml-12 relative">
          {/* horizontal scroll button */}
          {/* <div className="absolute top-[40%] right-7 bg-slate-main rounded-full w-12 h-12">
            <Image
            src="/images/icons/caret_darker_right.svg"
            width={8}
            height={8}
            alt="Arrow right"
            className="m-auto relative top-4"
            />
          </div> */}
          <p className="mb-6 text-3xl font-medium">PvP Games</p>
          <div className="flex flex-row gap-6 mb-20 relative overflow-hidden hover:overflow-x-scroll">
            {/* map over pvp games */}
            {menuItemsPVP.map((item, index) => (
              <div key={index} className="min-w-[370px]">
                <Link href={item.link}>
                  <Image
                    src={item.image}
                    width={370}
                    height={260}
                    alt={`${item.name} background`}
                    className="rounded-lg"
                  />
                  <p className="mt-5 body20">{item.name}</p>
                </Link>
              </div>
            ))}
          </div>

          <p className="mb-6 text-3xl font-medium">PvH Games</p>
          <div className="flex flex-row gap-6 mb-20 relative overflow-hidden hover:overflow-x-scroll">
            {/* map over pvh games */}
            {menuItemsPVH.map((item, index) => (
              <div key={index} className="min-w-[370px]">
                {/* <Link href={item.link}> */}
                <div className="relative">
                  <div className="absolute w-full h-[252px] rounded-xl bg-black-dark opacity-90"></div>
                  <div className="relative flex justify-center items-center">
                    <p className="text-2xl font-medium drop-shadow absolute uppercase top-28 text-center">
                      Coming Soon
                    </p>
                  </div>
                  <Image
                    src={item.image}
                    width={370}
                    height={260}
                    alt={`${item.name} background`}
                    className="rounded-lg"
                  />
                </div>
                <p className="mt-5 body20">{item.name}</p>
                {/* </Link> */}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        className={`limeGreenGradientBG rounded-3xl transition-all duration-300 ${
          sidebarStateActive ? 'ml-[324px]' : 'ml-[80px]'
        }`}
      >
        <div className="w-5/6 mx-auto">
          <h1 className="text-center mt-24 drop-shadow">How It Works</h1>
          <div className="mt-24 w-3/5 mr-auto">
            <p className="text-black-dark text-[24px]">
              <span className="text-[64px]">On-Chain </span>is a similarly open-concept, where every instance of a game
              exists in an immutable block in the Ethereum blockchain, readable by anyone on the web.{' '}
            </p>
          </div>
          <div className="mt-9 w-3/5 ml-auto">
            <p className="text-black-dark text-[24px]">
              <span className="text-[64px]">Open-Source </span>means that all of the game logic, currency distribution,
              game history, and leaderboard rankings are publicly available.
            </p>
          </div>
          {/* 3 steps cards */}
          <div
            className={`mt-24 mb-40 flex flex-col justify-evenly gap-4 ${
              sidebarStateActive ? 'lg:flex-row lg:mx-auto' : 'md:flex-row md:mx-auto'
            }`}
          >
            <div className="w-[360px] h-[405px] bg-slate-light rounded-3xl border-brand-green-hover border-2 flex flex-col justify-evenly px-4">
              <div className="mx-auto flex justify-center items-center w-20 h-20 bg-black-dark rounded-full">
                <h4>1</h4>
              </div>
              <p className="text-center text-brand-green text-[40px]">Connect Wallet</p>
              <p className="text-center text-white-darker text-[16px]">
                All games are on-chain, meaning that every game is provably fair and transparent.
              </p>
            </div>
            <div className="w-[360px] h-[405px] bg-slate-light rounded-3xl border-brand-green-hover border-2 flex flex-col justify-evenly px-4">
              <div className="mx-auto flex justify-center items-center w-20 h-20 bg-black-dark rounded-full">
                <h4>2</h4>
              </div>
              <p className="text-center text-brand-green text-[40px]">Play Games</p>
              <p className="text-center text-white-darker text-[16px]">
                All games are on-chain, meaning that every game is provably fair and transparent.
              </p>
            </div>
            <div className="w-[360px] h-[405px] bg-slate-light rounded-3xl border-brand-green-hover border-2 flex flex-col justify-evenly px-4">
              <div className="mx-auto flex justify-center items-center w-20 h-20 bg-black-dark rounded-full">
                <h4>3</h4>
              </div>
              <p className="text-center text-brand-green text-[40px]">Collect Rewards</p>
              <p className="text-center text-white-darker text-[16px]">
                All games are on-chain, meaning that every game is provably fair and transparent.
              </p>
            </div>
          </div>
          <h2 className="text-slate-main text-center w-4/5 m-auto">
            Learn all about our project, roadmap, and more in our Whitepaper
          </h2>
          <Link
            href="#"
            className="flex justify-center align-middle mt-11 mb-24 mx-auto w-[450px] h-[89px] rounded-full bg-brand-green hover:bg-brand-green-hover"
          >
            <p className="text-slate-main text-[24px] mx-auto my-auto">Read Whitepaper</p>
          </Link>
        </div>
      </section>
      <section
        className={`bg-black-dark min-h-[700px] transition-all duration-300 ${
          sidebarStateActive ? 'ml-[324px]' : 'ml-[80px]'
        }`}
      >
        <Reveal>
          <h3 className="mt-[168px] w-2/3 mx-auto text-center">
            Bet with BNB, and Claim your winnings in{' '}
            <span className="text-brand-green-hover">any supported token*</span>
          </h3>
        </Reveal>
        <div className="w-5/6 mt-[120px] mb-28 mx-auto flex flex-row justify-evenly">
          <Image src="/images/socials/discord.svg" width={50} height={100} alt="BNB icon" />
          <Image src="/images/socials/discord.svg" width={50} height={100} alt="BNB icon" />
          <Image src="/images/socials/discord.svg" width={50} height={100} alt="BNB icon" />
          <Image src="/images/socials/discord.svg" width={50} height={100} alt="BNB icon" />
        </div>
        <div className="relative flex justify-center">
          <p className="absolute bottom-0 max-w-[500px] text-center text-slate-accent">
            *If you want the PvP Casino to support cashing out in your token, join our discrod for inquireies and
            requests
          </p>
        </div>
      </section>
      <section className={`transition-all duration-300 ${sidebarStateActive ? 'ml-[324px]' : 'ml-[80px]'}`}>
        <Reveal>
          <h1 className="mt-[208px] w-4/5 mx-auto text-center drop-shadow">
            For questions, or to request features or token support, join our Discord
          </h1>
        </Reveal>
        <Link
          href="#"
          className="flex justify-center align-middle mt-24 mb-24 mx-auto w-[450px] h-[89px] rounded-full bg-brand-green hover:bg-brand-green-hover"
        >
          <p className="text-slate-main text-[24px] mx-auto my-auto">Join Discord</p>
        </Link>
      </section>
      <section className={`transition-all duration-300 ${sidebarStateActive ? 'ml-[324px]' : 'ml-[80px]'}`}>
        <Footer />
      </section>
    </Page>
  );
};

export default Home;
