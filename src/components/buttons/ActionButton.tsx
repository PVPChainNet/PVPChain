import Image from 'next/image';
import Link from 'next/link';

interface ActionButtonProps {
  color: string;
  link: string;
  text: string;
}

export default function ActionButtonItem({color, link, text}: ActionButtonProps) {
  return (
    <Link
      href={link}
      className={`flex justify-center align-middle h-[54px] w-full rounded-full ${
        color === 'blue' ? 'bg-brand-blue hover:bg-brand-blue-hover text-white-main' : ''
      } ${color === 'green' ? 'bg-brand-green hover:bg-brand-green-hover text-black-main' : ''}`}
    >
      <p className="font-medium text-[18px] my-auto">{text}</p>
    </Link>
  );
}
