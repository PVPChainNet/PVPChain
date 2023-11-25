import Link from 'next/link';
import Image from 'next/image';
import {menuItemsPVP} from '../../typescript/menuItems';

export default function Nav() {
  const year = new Date().getFullYear();

  return (
    <nav className="w-full bg-slate-light flex flex-col justify-center align-middle">
      <Link className="my-8 mx-auto" href="/">
        <Image src="/images/logos/pvp_logo.svg" width={100} height={100} alt="logo" />
      </Link>
      <div className="flex flex-row justify-between gap-8 max-w-[450px] mx-auto">
        <Link href="/profile">
          <p>Profile</p>
        </Link>
        <Link href="/tokenleaderboard">
          <p>Token Leaderboard</p>
        </Link>
        <Link href="/playerleaderboard">
          <p>Player Leaderboard</p>
        </Link>
      </div>
      <div className="flex flex-row justify-between gap-8 mt-4 max-w-[450px] mx-auto">
        {menuItemsPVP.map((item, index) => (
          <Link key={index} href={item.link}>
            <p>{item.name}</p>
          </Link>
        ))}
      </div>
      <div className="flex flex-row justify-between gap-8 mt-4 max-w-[450px] mx-auto">
        <Link href="/#">
          <p>Whitepaper</p>
        </Link>
        <Link href="/#">
          <p>Privacy Policy</p>
        </Link>
      </div>
      <div className="flex flex-row justify-between gap-8 mt-8 max-w-[450px] mx-auto">
        <Image src={'/images/socials/twitter.svg'} width={30} height={30} alt={'twitter icon'} />
        <Image src={'/images/socials/discord.svg'} width={30} height={30} alt={'discord icon'} />
        <Image src={'/images/socials/telegram.svg'} width={30} height={30} alt={'telegram icon'} />
      </div>
      <div className="flex flex-row justify-between gap-8 mt-8 mb-4 max-w-[450px] mx-auto">
        <p>{`PvP @${year}, All Rights Reserved`}</p>
      </div>
    </nav>
  );
}
