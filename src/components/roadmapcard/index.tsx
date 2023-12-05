import PropTypes, {Validator} from 'prop-types';

interface RoadmapCardProps {
  title: string;
  textItems: string[];
  releaseWindow: string;
  isPositionOnLeft: boolean;
  isLastCard: boolean;
}

const RoadmapCard: React.FC<RoadmapCardProps> = ({title, textItems, releaseWindow, isPositionOnLeft, isLastCard}) => {
  RoadmapCard.propTypes = {
    title: PropTypes.string.isRequired,
    //textItems: PropTypes.arrayOf(PropTypes.string).isRequired,
    textItems: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    //releaseWindow: PropTypes.string.isRequired,
    releaseWindow: PropTypes.string.isRequired as Validator<string>,
    isPositionOnLeft: PropTypes.bool.isRequired,
    isLastCard: PropTypes.bool.isRequired,
  };

  return (
    <div className="w-full">
      <div
        className={`flex flex-col-reverse ${
          isPositionOnLeft ? 'md:flex-row justify-between' : 'md:flex-row-reverse justify-between'
        }`}
      >
        {/* text section */}
        <div className="bg-white-darker shadow-lg w-full max-w-[540px] min-h-[260px] rounded-3xl drop-shadow-lg px-10 py-7">
          <p className="title32 mb-6 italic text-deep-blue">{title}</p>
          {textItems.map((item, index) => (
            <li key={index} className="text-[16px] text-black-dark list-disc">
              {item}
            </li>
          ))}
        </div>
        {/* release window */}
        <div className={` min-w-fit ${isPositionOnLeft ? 'md:rotate-90 self-center' : 'md:-rotate-90 self-center'}`}>
          <p className="uppercase text-[32px] font-medium">{releaseWindow}</p>
        </div>
      </div>
      {/* vertical line below if not last card */}
      {!isLastCard && <div className="my-11 h-36 w-0.5 bg-black-main mx-auto"></div>}
    </div>
  );
};

export default RoadmapCard;
