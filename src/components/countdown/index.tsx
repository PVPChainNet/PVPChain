import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

interface CountdownProps {
  targetDate: Date;
  onCountdownEnd: () => void;
}

const Countdown: React.FC<CountdownProps> = ({targetDate, onCountdownEnd}) => {
  Countdown.propTypes = {
    targetDate: PropTypes.instanceOf(Date).isRequired,
    onCountdownEnd: PropTypes.func.isRequired,
  };

  const calculateTimeLeft = () => {
    const difference = targetDate.getTime() - new Date().getTime();
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // call onCountdownEnd when countdown reaches 0
    if (difference < 0) {
      onCountdownEnd();
      //   const newTargetDate = onCountdownEnd();
    }

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-grey-lighter rounded-xl flex justify-center gap-6 mx-auto max-w-[450px] h-[100px] text-black-dark drop-shadow-lg">
      <div className="flex flex-col items-center">
        <p className="text-[40px] font-medium">{timeLeft.days}</p>
        <p className="text-[16px] font-light">Days</p>
      </div>
      <div>
        <p className="text-[40px] font-medium">:</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-[40px] font-medium">{timeLeft.hours}</p>
        <p className="text-[16px] font-light">Hours</p>
      </div>
      <div>
        <p className="text-[40px] font-medium">:</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-[40px] font-medium">{timeLeft.minutes}</p>
        <p className="text-[16px] font-light">Minutes</p>
      </div>
      <div>
        <p className="text-[40px] font-medium">:</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-[40px] font-medium">{timeLeft.seconds}</p>
        <p className="text-[16px] font-light">Seconds</p>
      </div>
    </div>
  );
};

export default Countdown;
