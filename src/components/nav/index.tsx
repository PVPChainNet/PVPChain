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
      <div className="z-10 absolute top-8 -right-36 w-24 h-11 bg-slate-light rounded-lg flex justify-evenly">
        <MusicControl controlFunction={'skip'} />
        <MusicControl controlFunction={'mute'} />
      </div>

      <div className={'transition-all'}>
        <Link href="/" className="block mt-2">
          {sidebarStateActive ? (
            <Image src={'/images/logos/pvp_logo.svg'} width={132} height={56} alt={'PVP Logo'} />
          ) : (
            <div className="h-[56px] flex">
              <Image
                className="m-auto"
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
            </div>
          ) : (
            <ul className="flex flex-col gap-2">
              <p className="text-center title20 mb-2">PvP</p>
              {menuItemsPVP.map((menuItem, index) => (
                <li className="" key={index} title={menuItem.name}>
                  <ActionButton
                    color="grey"
                    link={menuItem.link}
                    icon="/images/icons/house-96.png"
                    iconwidth={30}
                    circle={true}
                  />
                </li>
              ))}
            </ul>
          )}

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
          <div className={`justify-between ${sidebarStateActive ? 'flex' : 'hidden'}`}>
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
          <ul className={`my-4 flex-col gap-3 ${sidebarStateActive ? 'flex' : 'hidden'}`}>
            {menuItemsLottery.map((menuItem, index) => (
              <li className="" key={index}>
                <MenuItem link={menuItem.link} text={menuItem.name} />
              </li>
            ))}
          </ul>

          {/* Revenue Pool */}
          <div className={`${sidebarStateActive ? '' : 'hidden'}`}>
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
          </div>

          {/* The House */}
          <div className={`${sidebarStateActive ? '' : 'hidden'}`}>
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
        </div>

        {/* action buttons on bottom */}
        <div className="absolute bottom-0 w-[85%] mb-2">
          <div className="flex flex-col gap-4">
            {sidebarStateActive ? (
              <>
                <div title="Buy/Sell Points">
                  <ActionButton color="blue" link="/points" text="Buy/Sell Points" />
                </div>
                <div title="View Profile">
                  <ActionButton color="green" link="/profile" text="Profile" />
                </div>
              </>
            ) : (
              <>
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
                </div>

                <div className="mt-2" title="Buy/Sell Points">
                  <ActionButton
                    color="blue"
                    link="/points"
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
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
