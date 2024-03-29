import Link from 'next/link';
import Image from 'next/image';
import {menuItemsPVP} from '../../typescript/menuItems';

export default function Nav() {
  const year = new Date().getFullYear();

  return (
    <nav className="w-full bg-deep-blue flex flex-col justify-center align-middle">
      <Link className="my-4 sm:ml-8" href="/">
        <div className="flex justify-center mx-4 items-center">
          <h4 className=" font-serif font-bold">PVP</h4>
          <Image src={'/images/logos/new_logo_no_text.png'} width={108} height={108} alt={'PVP Logo'} />
        </div>
      </Link>
      <div className="flex flex-col sm:flex-row justify-evenly gap-8 mb-8">
        <div className="flex flex-col justify-center items-center text-center">
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
        <div className="flex flex-col justify-center items-center text-center">
          {menuItemsPVP.map((item, index) => (
            <Link key={index} href={item.link}>
              <p>{item.name}</p>
            </Link>
          ))}
        </div>
      </div>
      <hr className="w-full border-[#2D2D2D] border-opacity-50" />
      <div className="w-full bg-deep-blue flex flex-col md:flex-row justify-evenly items-center pb-4">
        <div className="flex flex-col sm:flex-row justify-center text-center sm:gap-4 mt-4 max-w-[450px] mx-auto">
          <Link href="https://app.gitbook.com/o/bosh1Lw7viN5cWrdY2Ig/s/NzQVjNo6xDa3gVEMSXEb/" target="_blank">
            <p>Whitepaper</p>
          </Link>
          <Link href="/privacypolicy">
            <p>Privacy Policy</p>
          </Link>
        </div>
        <div className="flex flex-row justify-between gap-8 mt-8 mb-4 max-w-[450px] mx-auto">
          <p>{`PvP @${year}, All Rights Reserved`}</p>
        </div>
        <div className="flex flex-row justify-between gap-8 mt-8 max-w-[450px] mx-auto">
          <Image src={'/images/socials/twitter.svg'} width={30} height={30} alt={'twitter icon'} />
          <Image src={'/images/socials/discord.svg'} width={30} height={30} alt={'discord icon'} />
          <Image src={'/images/socials/telegram.svg'} width={30} height={30} alt={'telegram icon'} />
        </div>
      </div>
    </nav>
  );
}
