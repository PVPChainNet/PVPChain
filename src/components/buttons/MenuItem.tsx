import Image from 'next/image';
import Link from 'next/link';

interface MenuItemProps {
  link: string;
  text: string;
}

export default function MenuItem({link, text}: MenuItemProps) {
  return (
    <Link href={link} className="flex justify-between align-middle h-[54px] w-full px-[14px] bg-slate-main rounded-lg">
      <p className="title20 opacity-[64%] my-auto">{text}</p>
      <Image src={'/images/icons/caret_darker_right.svg'} width={6} height={12} alt={'info icon'} />
    </Link>
  );
}
