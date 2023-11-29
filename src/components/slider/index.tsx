import React, {ChangeEvent, useState} from 'react';

interface SliderProps {
  totalAmount: number;
  isFeeApplied: boolean;
  onChange: (value: number, appleFee: boolean) => void;
}

const Slider: React.FC<SliderProps> = ({totalAmount, isFeeApplied, onChange}) => {
  const [value, setValue] = useState<number>(0);

  const handleSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    setValue(newValue);
    onChange(newValue, isFeeApplied);
  };

  return (
    <div className="w-full">
      <div className="">
        <p className="text-center">{value}</p>
      </div>
      <div className=" flex justify-between">
        <p className="text-[16px] font-light">0</p>
        <input
          type="range"
          min={0}
          max={totalAmount}
          value={value}
          onChange={handleSliderChange}
          className="mx-4 flex-grow"
        />
        <p className="text-[16px] font-light">{totalAmount}</p>
      </div>
      <div className="mt-7 flex justify-evenly items-center ">
        <p className="text-[16px] font-light text-[#FFAF75]">{value} BNB</p>
        <div className="h-[26px] rotate-180 arrow"></div>
        <p className="text-[16px] font-light text-[#FFAF75]">20 DOGE</p>
      </div>
      {isFeeApplied ? (
        <p className="mt-2 text-[12px] text-center text-red-600 font-light">10% Fee Applied</p>
      ) : (
        <div className="h-8"></div>
      )}
    </div>
  );
};

export default Slider;
