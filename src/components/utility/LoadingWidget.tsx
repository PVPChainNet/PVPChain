import classNames from 'classnames';

type LoadingWidgetPropsT = {
  message?: string;
  size?: 'sm' | 'lg';
  inline?: boolean;
  dark?: boolean;
  textClasses?: string;
  ringClasses?: string;
  hideText?: boolean;
};

export default function LoadingWidget({
  message = 'Processing',
  size,
  inline = false,
  dark = false,
  textClasses = '',
  ringClasses = '',
  hideText = false,
}: LoadingWidgetPropsT) {
  return (
    <div
      className={classNames('flex', {
        'flex-col items-center': !inline,
        'flex-row items-center': inline,
      })}
    >
      <div
        className={classNames('animate-pulse processing-ring', ringClasses, {
          'processing-ring--inline': inline,
          'processing-ring--small': size === 'sm',
          'processing-ring--large': size === 'lg',
          'processing-ring--dark': dark,
        })}
      >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {!hideText && (
        <div
          className={classNames('animate-pulse text-xl md:text-2xl', textClasses, {
            'text-brand-4': !textClasses,
            'text-black': dark,
          })}
        >
          {message}
        </div>
      )}
    </div>
  );
}
