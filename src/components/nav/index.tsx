import Image from 'next/image';
import MenuItem from '../buttons/MenuItem';
import {menuItemsPVP, menuItemsPVH, menuItemsLottery, menuItemsRevenue, menuItemsHouse} from '@/typescript/menuItems';
import ActionButton from '../buttons/ActionButton';
import Tooltip from '../utility/Tooltip';
import Link from 'next/link';
import {useSidebar, useSidebarUpdate} from '@/contexts/SidebarContext';
import MusicControls from '../buttons/MusicControls';
import {useEffect, useState} from 'react';

/* interface NavProps {
  onToggle: () => void;
  isOpen: boolean;
} */

export default function Nav() {
  //NOTE: replaced the props with the context hooks
  const sidebarStateActive = useSidebar();
  const toggleSidebar = useSidebarUpdate();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <nav
      className={`fixed h-full bg-slate-light transition-all duration-300 z-30 ${
        sidebarStateActive ? 'w-[324px] px-6' : 'w-20 px-2'
      }`}
    >
      {/* toggle button */}
      <div className="z-10 absolute top-8 -right-8">
        <button onClick={toggleSidebar} className="shake">
          {sidebarStateActive ? (
            <div className="w-10 h-[44px] bg-slate-light rounded-t-lg rounded-r-lg flex justify-center hover:scale-110">
              <Image
                src={'/images/icons/caret_darker_right.svg'}
                width={10}
                height={18}
                alt={'close icon'}
                className="my-auto rotate-180"
              />
            </div>
          ) : (
            <div className="w-10 h-[44px] bg-slate-light rounded-t-lg rounded-r-lg flex justify-center hover:scale-110">
              <Image
                src={'/images/icons/caret_darker_right.svg'}
                width={10}
                height={18}
                alt={'close icon'}
                className="my-auto"
              />
            </div>
          )}
        </button>
      </div>

      {/* music controls */}
      <MusicControls />

      <div className={'transition-all'}>
        <Link href="/" className="block mt-2">
          {sidebarStateActive ? (
            <Image src={'/images/logos/pvp_logo.svg'} width={132} height={56} alt={'PVP Logo'} />
          ) : (
            <div className="h-[56px] flex">
              <Image
                className="m-auto"
                title="Home"
                src={'/images/logos/pvp_logo_no_text.svg'}
                width={30}
                height={30}
                alt={'PVP Logo'}
              />
            </div>
          )}
        </Link>
        <hr className="mt-2 mb-6 text-white-main opacity-20" />

        {/* scrollable nav list */}
        <div>
          {/* PVP Games */}
          {sidebarStateActive ? (
            <div>
              <div className="flex gap-[6px]">
                <p className="body16Medium">PvP Games</p>
                <Tooltip text="PvP games are games where you play against other players." />
                {/* <Image src={'/images/icons/info_icon.svg'} width={20} height={20} alt={'info icon'} /> */}
              </div>
              <ul className="my-4 flex flex-col gap-3">
                {menuItemsPVP.map((menuItem, index) => (
                  <li className="" key={index}>
                    <MenuItem link={menuItem.link} text={menuItem.name} />
                  </li>
                ))}
              </ul>
              <div className="flex gap-[6px]">
                <p className="body16Medium">Leaderboards</p>
                <Tooltip text="Leaderboards track betters with the most risk-points in a given time period" />
              </div>
              <ul className="my-4 flex flex-col gap-3">
                <li className="">
                  <MenuItem link={'#'} text={'Token Leaderboard'} />
                </li>
                <li className="">
                  <MenuItem link={'#'} text={'Player Leaderboard'} />
                </li>
              </ul>
            </div>
          ) : (
            <ul className="flex flex-col gap-2">
              <p className="text-center title20 mb-2">PvP</p>
              {menuItemsPVP.map((menuItem, index) => (
                <li className="" key={index} title={menuItem.name}>
                  {isMounted ? (
                    <ActionButton
                      color="grey"
                      link={menuItem.link}
                      icon="/images/icons/house-96.png"
                      iconwidth={30}
                      circle={true}
                    />
                  ) : (
                    <div className="max-w-[54px] mx-auto h-[54px] w-full rounded-full"></div>
                  )}
                </li>
              ))}
              <p className="text-center title20 mt-4 mb-2">LB</p>
              <li className="" title={'Token Leaderboard'}>
                <ActionButton color="grey" link={'#'} icon="/images/icons/house-96.png" iconwidth={30} circle={true} />
              </li>
              <li className="" title={'Player Leaderboard'}>
                <ActionButton color="grey" link={'#'} icon="/images/icons/house-96.png" iconwidth={30} circle={true} />
              </li>
            </ul>
          )}

          {/* PvH Games - add when PvH is added */}
          {/* <div className="flex gap-[6px]">
            <p>PvH Games</p>
            <Tooltip text="PvH games are games where you play against the house." />
          </div>
          <ul className="my-4 flex flex-col gap-3">
            {menuItemsPVH.map((menuItem, index) => (
              <li className="" key={index}>
                <MenuItem link={menuItem.link} text={menuItem.name} />
              </li>
            ))}
          </ul> */}

          {/* Lottery - removed for now */}
          {/* <div className={`justify-between ${sidebarStateActive ? 'flex' : 'hidden'}`}>
            <div className="flex gap-[6px]">
              <p>Lottery</p>
              <Tooltip text="The Lottery is a pool of money that anyone can win." />
            </div>
            <div className="flex gap-[6px]">
              <p>Pot: </p>
              <p className="font-light">$1,200,550.40</p>
            </div>
          </div>
          <ul className={`my-4 flex-col gap-3 ${sidebarStateActive ? 'flex' : 'hidden'}`}>
            {menuItemsLottery.map((menuItem, index) => (
              <li className="" key={index}>
                <MenuItem link={menuItem.link} text={menuItem.name} />
              </li>
            ))}
          </ul> */}

          {/* Revenue Pool - removed for now */}
          {/* <div className={`${sidebarStateActive ? '' : 'hidden'}`}>
            <div className="flex gap-[6px]">
              <p>Revenue Pool</p>
              <Tooltip text="The Revenue Pool is where you can buy and sell points." />
            </div>
            <ul className="my-4 flex flex-col gap-3">
              {menuItemsRevenue.map((menuItem, index) => (
                <li className="" key={index}>
                  <MenuItem link={menuItem.link} text={menuItem.name} />
                </li>
              ))}
            </ul>
          </div> */}

          {/* The House - add when PvH is added */}
          {/* <div className={`${sidebarStateActive ? '' : 'hidden'}`}>
            <div className="flex gap-[6px]">
              <p>House Pool</p>
              <Tooltip text="The Revenue Pool is where you can buy and sell points." />
            </div>
            <ul className="my-4 flex flex-col gap-3">
              {menuItemsHouse.map((menuItem, index) => (
                <li className="" key={index}>
                  <MenuItem link={menuItem.link} text={menuItem.name} />
                </li>
              ))}
            </ul>
          </div> */}
        </div>

        {/* action buttons on bottom */}
        <div className="absolute bottom-0 w-[85%] mb-4">
          <div className="flex flex-col gap-2">
            {sidebarStateActive ? (
              <>
                <div title="Swap Tokens" className="mb-2">
                  <ActionButton color="blue" link="/swap" text="Swap Tokens" />
                </div>
                <div title="View Profile">
                  <ActionButton color="green" link="/profile" text="Profile" />
                </div>
                <Link href="https://app.gitbook.com/o/bosh1Lw7viN5cWrdY2Ig/s/NzQVjNo6xDa3gVEMSXEb/" target="_blank">
                  <p className="body16Medium text-center my-4">Read Whitepaper</p>
                </Link>
                {/* socials */}
                <div className="flex flex-row justify-evenly">
                  <Image src={'/images/socials/twitter.svg'} width={30} height={30} alt={'twitter icon'} />
                  <Image src={'/images/socials/discord.svg'} width={30} height={30} alt={'discord icon'} />
                  <Image src={'/images/socials/telegram.svg'} width={30} height={30} alt={'telegram icon'} />
                </div>
              </>
            ) : (
              <>
                {/* <div title="Token Leaderboard">
                  <ActionButton
                    color="grey"
                    link="/lottery"
                    icon="/images/icons/lottery-90.png"
                    iconwidth={30}
                    circle={true}
                  />
                </div>
                <div title="Player Leaderboard">
                  <ActionButton
                    color="grey"
                    link="/lottery"
                    icon="/images/icons/lottery-90.png"
                    iconwidth={30}
                    circle={true}
                  />
                </div>
                <div title="The House">
                  <ActionButton
                    color="grey"
                    link="/thehouse"
                    icon="/images/icons/house-96.png"
                    iconwidth={30}
                    circle={true}
                  />
                </div>
                <div title="The Lottery">
                  <ActionButton
                    color="grey"
                    link="/lottery"
                    icon="/images/icons/lottery-90.png"
                    iconwidth={30}
                    circle={true}
                  />
                </div>
                <div title="Revenue Pool">
                  <ActionButton
                    color="grey"
                    link="/revenuepool"
                    icon="/images/icons/pool-100.png"
                    iconwidth={30}
                    circle={true}
                  />
                </div> */}

                <div className="mt-2" title="Swap Tokens">
                  <ActionButton
                    color="blue"
                    link="/swap"
                    icon="/images/icons/points-100.png"
                    iconwidth={30}
                    circle={true}
                  />
                </div>
                <div title="View Profile">
                  <ActionButton
                    color="green"
                    link="/profile"
                    icon="/images/icons/profile-64.png"
                    iconwidth={44}
                    circle={true}
                  />
                </div>
                {/* socials */}
                {/* <div className="flex flex-col my-4 gap-4 justify-center align-middle">
                  <Image
                    className="m-auto"
                    src={'/images/socials/twitter.svg'}
                    width={30}
                    height={30}
                    alt={'twitter icon'}
                  />
                  <Image
                    className="m-auto"
                    src={'/images/socials/discord.svg'}
                    width={30}
                    height={30}
                    alt={'discord icon'}
                  />
                  <Image
                    className="m-auto"
                    src={'/images/socials/telegram.svg'}
                    width={30}
                    height={30}
                    alt={'telegram icon'}
                  />
                </div> */}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
