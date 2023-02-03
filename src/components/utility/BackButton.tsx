import ArrowBack from '@mui/icons-material/ArrowBack';
import classNames from 'classnames';
import {useRouter} from 'next/router';
import React from 'react';

type BackButtonPropsT = {
  text?: string;
  showArrow?: boolean;
  onClick?: () => void;
  className?: string;
};

function BackButton({text = 'Go Back', showArrow = true, className, onClick}: BackButtonPropsT) {
  const router = useRouter();

  const back = () => {
    if (onClick) {
      onClick();
    }
    router.back();
  };

  return (
    <button className={classNames('app-btn app-btn--primary', className)} onClick={() => back()}>
      {showArrow && <ArrowBack className="mr-1" />}
      {text}
    </button>
  );
}

export default BackButton;
