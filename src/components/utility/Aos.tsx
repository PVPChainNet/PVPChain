import classNames from 'classnames';
import React, {useEffect, useRef} from 'react';

type AosPropsT = {
  children: React.ReactNode;
  className?: string;
  animation?: string;
  rootMargin?: string;
  threshold?: number;
};

function AnimateOnScroll({
  children,
  className,
  animation = 'animate__fadeInUp',
  rootMargin = '0px',
  threshold = 0.05,
}: AosPropsT) {
  const inputEl = useRef(null);

  useEffect(() => {
    const callback = function (entries: IntersectionObserverEntry[]) {
      entries.forEach(entry => {
        // Is the element in the viewport?
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0');
          entry.target.classList.add(animation);
        }
      });
    };

    const observer = new IntersectionObserver(callback, {rootMargin, threshold});
    const inputRef = inputEl.current;

    if (!inputRef) return;
    observer.observe(inputRef);
  }, [animation, rootMargin, threshold]);

  return (
    <div ref={inputEl} className={classNames('opacity-0 animate__animated', className)}>
      {children}
    </div>
  );
}

export default AnimateOnScroll;
