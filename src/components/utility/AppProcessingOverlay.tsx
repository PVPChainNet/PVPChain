import classNames from 'classnames';
import LoadingWidget from './LoadingWidget';

/**
 * @typedef {Object} AppProcessingOverlayPropsT - Props for AppProcessingOverlay
 * @property {boolean} isProcessing - Whether or not the overlay is active
 * @property {boolean} fixed - Whether or not the overlay is fixed or absolutely positioned
 * @property {string} [text='Processing'] - Text to display
 * @property {textClasses} [string] - CSS classes to apply to the loading widget's textClasses prop
 * @property {ringClasses} [string] - CSS classes to apply to the loading widget's ringClasses prop
 */
type AppProcessingOverlayPropsT = {
  isProcessing: boolean;
  text?: string;
  fixed?: boolean;
  textClasses?: string;
  ringClasses?: string;
};

/**
 * Displays a fixed or absolutely positioned element with an opaque black background, positioned to the nearest relative parent.
 *
 * @author Dapptain <@dapptin>
 * @requires LoadingWidget - Displayed when the overlay is active
 * @param {AppProcessingOverlayPropsT} AppProcessingOverlayPropsT - Props to pass to the component
 * @returns {React.ElementType} - React Element
 */
export default function AppProcessingOverlay({
  isProcessing = false,
  fixed = false,
  text = 'Processing',
  textClasses = undefined,
  ringClasses = undefined,
}: AppProcessingOverlayPropsT) {
  return (
    <>
      {isProcessing && (
        <div
          className={classNames('bg-black/50  inset-0 z-50 rounded-md flex items-center justify-center', {
            absolute: !fixed,
            fixed: fixed,
          })}
        >
          <LoadingWidget message={text} textClasses={textClasses} ringClasses={ringClasses} />
        </div>
      )}
    </>
  );
}
