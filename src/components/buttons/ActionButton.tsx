import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';

interface ActionButtonProps {
  color: string;
  link: string;
  text?: string;
  icon?: string;
  iconwidth?: number;
  circle?: boolean;
}

export default function ActionButtonItem({color, link, text, icon, iconwidth, circle}: ActionButtonProps) {
  const router = useRouter();

  return (
    <Link
      href={link}
      className={`flex justify-center align-middle 
      ${
        router.pathname.includes(link)
          ? 'bg-brand-green text-black focus:outline-none focus:ring-2 focus:ring-green-300 hover:bg-brand-green-hover'
          : 'hover:bg-slate-700'
      }
      ${circle?.valueOf() == true ? 'max-w-[54px] mx-auto' : ''} h-[54px] w-full rounded-full ${
        color === 'blue' ? 'bg-brand-blue hover:bg-brand-blue-hover text-white-main' : ''
      } ${color === 'pink' ? 'bg-brand-pink hover:bg-brand-pink-hover text-white-main' : ''} ${
        color === 'green' ? 'bg-brand-green hover:bg-brand-green-hover text-black-main' : ''
      } ${color === 'grey' ? 'bg-brand-grey hover:bg-brand-grey-hover text-black-main' : ''}
      
      `}
    >
      <p className="font-medium text-[18px] my-auto">{text}</p>
      {icon ? (
        <Image src={icon} width={iconwidth} height={iconwidth} alt="Action Button Icon" className="my-auto" />
      ) : (
        ''
      )}
    </Link>
  );
}
