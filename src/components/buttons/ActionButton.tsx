import {use} from 'chai';
import {set} from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

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
        color === 'grey' && router.pathname.includes(link)
          ? 'text-black focus:outline-none border-2 border-brand-green shadow-sm shadow-brand-green'
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
