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
    <div className="">
      <div className={`flex flex-col ${isPositionOnLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
        {/* text section */}
        <div className="whiteToGreenGradient w-full max-w-[540px] min-h-[260px] max-h-[360px] rounded-3xl drop-shadow-lg px-10 py-7">
          <p className="text-black-dark title32 mb-8">{title}</p>
          {textItems.map((item, index) => (
            <li key={index} className="text-[16px] text-black-dark list-disc">
              {item}
            </li>
          ))}
        </div>
        {/* release window */}
        <div className={`${isPositionOnLeft ? 'md:rotate-90' : 'md:-rotate-90'}`}>
          <p className="uppercase text-[32px] font-medium">{releaseWindow}</p>
        </div>
      </div>
      {/* vertical line below if not last card */}
      {!isLastCard && <div className="my-11 h-36 w-0.5 bg-black-main mx-auto"></div>}
    </div>
  );
};

export default RoadmapCard;
