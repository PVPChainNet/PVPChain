import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';

interface MenuItemProps {
  link: string;
  text: string;
}

export default function MenuItem({link, text}: MenuItemProps) {
  const router = useRouter();

  return (
    <Link
      href={link}
      className={`flex justify-between align-middle h-[40px] w-full px-[14px] bg-slate-main rounded-lg ${
        router.pathname === link
          ? 'bg-brand-green text-black focus:outline-none focus:ring-2 focus:ring-green-300 hover:bg-brand-green-hover'
          : 'hover:bg-slate-700'
      }`}
    >
      {' '}
      {/* h-[54px] */}
      <p className="text-sm opacity-[64%] my-auto">{text}</p> {/* title20 */}
      <Image src={'/images/icons/caret_darker_right.svg'} width={6} height={12} alt={'info icon'} />
    </Link>
  );
}
