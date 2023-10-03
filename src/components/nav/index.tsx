'use client';
import {useState} from 'react';
import Image from 'next/image';
import MenuItem from '../buttons/MenuItem';
import {menuItemsPVP, menuItemsPVH, menuItemsLottery, menuItemsRevenue} from '@/typescript/menuItems';
import ActionButton from '../buttons/ActionButton';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <nav
      className={`fixed h-full px-6 w-0 bg-slate-light transition-all duration-300 z-30 ${
        isOpen ? 'w-[324px]' : 'px-0'
      }`}
    >
      {/* toggle button */}
      <div className="z-10 absolute top-10 -right-5">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <div className="w-6 h-[44px] bg-slate-light rounded-t-lg rounded-r-lg flex justify-center">
              <Image
                src={'/images/icons/caret_darker_right.svg'}
                width={6}
                height={12}
                alt={'close icon'}
                className="my-auto rotate-180"
              />
            </div>
          ) : (
            <div className="w-6 h-[44px] bg-slate-light rounded-t-lg rounded-r-lg flex justify-center">
              <Image
                src={'/images/icons/caret_darker_right.svg'}
                width={6}
                height={12}
                alt={'close icon'}
                className="my-auto"
              />
            </div>
          )}
        </button>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'}`}>
        <Image src={'/images/logos/pvp_logo.svg'} width={132} height={56} alt={'PVP Logo'} />
        <hr className="my-6 text-white-main opacity-20" />

        {/* PVP Games */}
        <div className="flex gap-[6px]">
          <p className="body16Medium">PvP Games</p>
          <Image src={'/images/icons/info_icon.svg'} width={20} height={20} alt={'info icon'} />
        </div>
        <ul className="my-4 flex flex-col gap-3">
          {menuItemsPVP.map((menuItem, index) => (
            <li className="" key={index}>
              <MenuItem link={menuItem.link} text={menuItem.name} />
            </li>
          ))}
        </ul>

        {/* PvH Games */}
        <div className="flex gap-[6px]">
          <p>PvH Games</p>
          <Image src={'/images/icons/info_icon.svg'} width={20} height={20} alt={'info icon'} />
        </div>
        <ul className="my-4 flex flex-col gap-3">
          {menuItemsPVH.map((menuItem, index) => (
            <li className="" key={index}>
              <MenuItem link={menuItem.link} text={menuItem.name} />
            </li>
          ))}
        </ul>

        {/* Lottery */}
        <div className="flex gap-[6px]">
          <p>Lottery</p>
          <Image src={'/images/icons/info_icon.svg'} width={20} height={20} alt={'info icon'} />
        </div>
        <div className="flex justify-between">
          <p>Current Pot</p>
          <p>$1,200,550.40</p>
        </div>
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
          <Image src={'/images/icons/info_icon.svg'} width={20} height={20} alt={'info icon'} />
        </div>
        <ul className="my-4 flex flex-col gap-3">
          {menuItemsRevenue.map((menuItem, index) => (
            <li className="" key={index}>
              <MenuItem link={menuItem.link} text={menuItem.name} />
            </li>
          ))}
        </ul>

        {/* action buttons */}
        <div className="absolute bottom-0 w-[276px] mb-2">
          <div className="flex flex-col gap-4">
            <ActionButton color="blue" link="/connect" text="Buy/Sell Points" />
            <ActionButton color="green" link="/profile" text="Profile" />
          </div>
        </div>
      </div>
    </nav>
  );
}
