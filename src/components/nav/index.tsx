import Image from 'next/image';
import MenuItem from '../buttons/MenuItem';
import {menuItemsPVP, menuItemsPVH, menuItemsLottery, menuItemsRevenue, menuItemsHouse} from '@/typescript/menuItems';
import ActionButton from '../buttons/ActionButton';
import Tooltip from '../utility/Tooltip';
import Link from 'next/link';
import {useSidebar, useSidebarUpdate} from '@/contexts/SidebarContext';
import MusicControl from '../buttons/MusicControl';

/* interface NavProps {
  onToggle: () => void;
  isOpen: boolean;
} */

export default function Nav() {
  //NOTE: replaced the props with the context hooks
  const sidebarStateActive = useSidebar();
  const toggleSidebar = useSidebarUpdate();

  return (
    <nav
      className={`fixed h-full bg-slate-light transition-all duration-300 z-30 ${
        sidebarStateActive ? 'w-[324px] px-6' : 'w-0 px-0'
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
      <div className="z-10 absolute top-8 -right-36 w-24 h-11 bg-slate-light rounded-lg flex justify-evenly">
        <MusicControl controlFunction={'skip'} />
        <MusicControl controlFunction={'mute'} />
      </div>

      <div className={`${sidebarStateActive ? 'block' : 'hidden'}`}>
        <Link href="/" className="block mt-2">
          <Image src={'/images/logos/pvp_logo.svg'} width={132} height={56} alt={'PVP Logo'} />
        </Link>
        <hr className="mt-2 mb-6 text-white-main opacity-20" />

        {/* scrollable nav list */}
        <div className="">
          {/* PVP Games */}
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

          {/* PvH Games */}
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

          {/* Lottery */}
          <div className="flex justify-between">
            <div className="flex gap-[6px]">
              <p>Lottery</p>
              <Tooltip text="The Lottery is a pool of money that anyone can win." />
            </div>
            <div className="flex gap-[6px]">
              <p>Pot: </p>
              <p className="font-light">$1,200,550.40</p>
            </div>
          </div>
          {/* changed this to be on line (above) */}
          {/* <div className="flex justify-between">
            <p>Current Pot</p>
            <p>$1,200,550.40</p>
          </div> */}
          <ul className="my-4 flex flex-col gap-3">
            {menuItemsLottery.map((menuItem, index) => (
              <li className="" key={index}>
                <MenuItem link={menuItem.link} text={menuItem.name} />
              </li>
            ))}
          </ul>

          {/* Revenue Pool */}
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

          {/* The House */}
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
        </div>

        {/* action buttons on bottom */}
        <div className="absolute bottom-0 w-[276px] mb-2">
          <div className="flex flex-col gap-4">
            <ActionButton color="blue" link="/points" text="Buy/Sell Points" />
            <ActionButton color="green" link="/profile" text="Profile" />
          </div>
        </div>
      </div>
    </nav>
  );
}
