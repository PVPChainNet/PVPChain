import Image from 'next/image';
import Link from 'next/link';

interface MenuItemProps {
  link: string;
  text: string;
}

export default function MenuItem({link, text}: MenuItemProps) {
  return (
    <Link
      href={link}
      className="flex justify-between align-middle h-[40px] w-full px-[14px] bg-slate-main rounded-lg hover:bg-slate-700"
    >
      {' '}
      {/* h-[54px] */}
      <p className="text-sm opacity-[64%] my-auto">{text}</p> {/* title20 */}
      <Image src={'/images/icons/caret_darker_right.svg'} width={6} height={12} alt={'info icon'} />
    </Link>
  );
}
