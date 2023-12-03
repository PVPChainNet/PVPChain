import {NextPage} from 'next';
import Link from 'next/link';
import Image from 'next/image';
// import PageContent from '@/components/page/content';
import {menuItemsPVP, menuItemsPVH} from '../typescript/menuItems';
import Page from '@/components/page';
import {useSidebar} from '@/contexts/SidebarContext';
import Footer from '../components/footer';
import Reveal from '../components/utility/Reveal';
import {useState} from 'react';
import HowItWorksCard from '../components/howitworks';
import RoadmapCard from '../components/roadmapcard';

const Home: NextPage = () => {
  const sidebarStateActive = useSidebar();
  const [activeHowItWorksStep, setActiveHowItWorksStep] = useState(0);

  const howItWorksItems = [
    {
      title: 'Connect Wallet',
      description:
        'To play games and earn rewards, simply connect your wallet via the widget in the top right corner of the site.',
    },
    {
      title: 'Play Games',
      description:
        'To play games and earn rewards, simply connect your wallet via the widget in the top right corner of the site.',
    },
    {
      title: 'Earn Rewards',
      description:
        'To play games and earn rewards, simply connect your wallet via the widget in the top right corner of the site.',
    },
    {
      title: 'Additional Opportunities to Earn',
      description:
        'To play games and earn rewards, simply connect your wallet via the widget in the top right corner of the site.',
    },
  ];

  const roadmapItems = [
    {
      title: 'Public Launch',
      textItems: [
        'Share platform details with token communities',
        'Launch platform with PvP Games, including Russian Roulette and Winner Takes All',
        'Listen to community feedback, continue platform development and support',
      ],
      releaseWindow: 'December 2023',
    },
    {
      title: 'Add NFT and Prediction Market',
      textItems: [
        'Add PvP Game - Prediction Market. Prediction Market is a fun game to play at the market',
        'Add limited number of NFTs. NFT owners will receive platform benefits such as increased winnings',
      ],
      releaseWindow: 'Before 2024',
    },
    {
      title: 'Add PvE Games',
      textItems: ['Add PvE Games, including Slots, Coin Flip, and Wheel of Fortune', 'More info...'],
      releaseWindow: 'January 2024',
    },
  ];

  const updateActiveHowItWorksFromCardComp = (step: number) => {
    setActiveHowItWorksStep(step);
  };

  return (
    <Page showConnectButton={true} showNav={false} showAppFooter={false} showAppHeader={false}>
      <section className={`${sidebarStateActive ? 'sidebarActive' : 'sidebarSmall'}`}>
        <div className="relative mt-28 mb-20 ml-12 max-w-4xl">
          <Reveal delay={0}>
            <h2>
              The world&apos;s first <span className="text-brand-green">decentralized</span>,{' '}
              <span className="text-brand-green">trustless</span>, fully{' '}
              <span className="text-brand-green">on-chain</span> casino.
            </h2>
          </Reveal>
        </div>
      </section>

      <section className={`${sidebarStateActive ? 'sidebarActive' : 'sidebarSmall'}`}>
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
                    className="rounded-lg hover:scale-105 transition-all duration-300"
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
                  <div className="">
                    <Image
                      src={item.image}
                      width={370}
                      height={260}
                      alt={`${item.name} background`}
                      className="rounded-lg hover:scale-105 transition-all duration-300"
                    />
                  </div>
                </div>
                <p className="mt-5 body20">{item.name}</p>
                {/* </Link> */}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className={`bg-grey-lighter rounded-3xl ${sidebarStateActive ? 'sidebarActive' : 'sidebarSmall'}`}>
        <div className="w-full mx-auto px-12 mt-24">
          <h1 className="text-center text-black-dark">Trust the Tech</h1>
          <h1 className="mt-3 text-center text-black-dark">Play the Games</h1>
          {/* open source and blockchain info cards */}
          <div className="mt-24 flex flex-col md:flex-row justify-evenly gap-8 text-black-dark">
            <Reveal>
              <div className="bg-[#F5F5F5] w-full max-w-[540px] min-h-[360px] rounded-3xl after:drop-shadow-lg flex flex-col justify-evenly px-10 py-7">
                <Image
                  className="mx-auto"
                  src="/images/icons/open-source.png"
                  width={96}
                  height={96}
                  alt="Open Source icon"
                />
                <p className="text-[40px] uppercase text-center">Open Source</p>
                <p className="text-[20px]">
                  All of the game logic, currency distribution, game history, and leaderboard rankings are publicly
                  available.
                </p>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div className="bg-[#F5F5F5] w-full max-w-[540px] min-h-[360px] rounded-3xl after:drop-shadow-lg flex flex-col justify-evenly px-10 py-7">
                <Image
                  className="mx-auto"
                  src="/images/icons/blockchain.png"
                  width={96}
                  height={96}
                  alt="Blockchain icon"
                />
                <p className="text-[40px] uppercase text-center">On-Chain</p>
                <p className="text-[20px]">
                  Every instance of a game exists in an immutable block in the Ethereum blockchain, readable by anyone
                  on the web.{' '}
                </p>
              </div>
            </Reveal>
          </div>

          {/* how it works section */}
          <div className="mt-11 mb-28 flex flex-col md:flex-row gap-4">
            {/* left column */}
            <div className="basis-1/2">
              <h4 className="my-10 text-black-dark">How it Works</h4>
              {/* selectable step buttons */}
              <div className="flex flex-col gap-5 w-full mb-12">
                {howItWorksItems.map((item, index) => (
                  <HowItWorksCard
                    key={index}
                    index={index}
                    activeCard={activeHowItWorksStep}
                    title={item.title}
                    description={item.description}
                    onClick={updateActiveHowItWorksFromCardComp}
                  />
                ))}
              </div>
            </div>
            {/* right column */}
            <div className="basis-1/2 my-4 flex justify-center items-center rounded-xl bg-gradient-to-br from-slate-500 to-orange-300">
              <div className="glassyBG">
                <Image
                  src={`/images/howitworks/${activeHowItWorksStep + 1}.png`}
                  width={430}
                  height={200}
                  alt={'connect wallet image'}
                />
              </div>
            </div>
          </div>

          {/* 3 steps cards */}
          {/* <div
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
          </div> */}

          <h2 className="text-slate-main text-center w-4/5 m-auto">
            Learn all about our project, roadmap, and more in our Whitepaper
          </h2>
          <Link
            href="https://app.gitbook.com/o/bosh1Lw7viN5cWrdY2Ig/s/NzQVjNo6xDa3gVEMSXEb/"
            target="_blank"
            className="flex justify-center align-middle mt-11 mb-24 mx-auto w-[450px] h-[89px] rounded-full bg-brand-green hover:bg-brand-green-hover"
          >
            <p className="text-slate-main text-[24px] mx-auto my-auto">Read Whitepaper</p>
          </Link>
        </div>
      </section>
      <section className={`bg-black-dark min-h-[700px] ${sidebarStateActive ? 'sidebarActive' : 'sidebarSmall'}`}>
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

      {/* roadmap section  */}
      <section className={`purpleTopToBottomGradient ${sidebarStateActive ? 'sidebarActive' : 'sidebarSmall'}`}>
        <h1 className="mt-28 mb-24 text-center text-white-main">Roadmap</h1>
        {/* roadmap cards */}
        <div className="w-4/5 mx-auto">
          {roadmapItems.map((item, index) => (
            <Reveal key={index}>
              <RoadmapCard
                title={item.title}
                textItems={item.textItems}
                releaseWindow={item.releaseWindow}
                isPositionOnLeft={index % 2 == 0}
                isLastCard={index + 1 === roadmapItems.length}
              />
            </Reveal>
          ))}
        </div>
      </section>

      <section className={`${sidebarStateActive ? 'sidebarActive' : 'sidebarSmall'}`}>
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
      <section className={`${sidebarStateActive ? 'sidebarActive' : 'sidebarSmall'}`}>
        <Footer />
      </section>
    </Page>
  );
};

export default Home;
