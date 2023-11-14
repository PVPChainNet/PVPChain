import React, {useState} from 'react';
import Image from 'next/image';

interface TooltipProps {
  text: string;
}

const Tooltip = ({text}: TooltipProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative flex">
      <Image
        src="/images/icons/info_icon.svg"
        alt="Tooltip Icon"
        width={20}
        height={20}
        className="w-5 h-5 my-auto cursor-pointer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      />
      <div
        className={`absolute z-30 top-full left-full w-60 bg-slate-main text-white p-2 rounded-lg shadow-md ${
          showTooltip ? 'block' : 'hidden'
        }`}
      >
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Tooltip;
