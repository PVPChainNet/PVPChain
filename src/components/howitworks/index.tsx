import PropTypes from 'prop-types';

interface howItWorksProps {
  index: number;
  title: string;
  description: string;
  activeCard: number;
  onClick: (index: number) => void;
}

const HowItWorksCard: React.FC<howItWorksProps> = ({index, title, description, activeCard, onClick}) => {
  HowItWorksCard.propTypes = {
    index: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    activeCard: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  return (
    <div
      onClick={() => onClick(index)}
      className={`cursor-pointer min-h-[80px] rounded-lg py-5 pl-5 pr-2 ${
        activeCard === index ? 'bg-slate-main' : 'bg-white-main'
      }`}
    >
      <div className=" flex justify-start items-center gap-5">
        {/* step number */}
        <div
          className={`flex justify-center items-center w-10 h-10 rounded-full ${
            activeCard === index ? 'bg-brand-teal-dark' : 'bg-brand-teal-light'
          }`}
        >
          <p className="text-[16px]">{index + 1}</p>
        </div>
        {/* step heading */}
        <p className={`text-[24px] font-medium ${activeCard === index ? 'text-white-main' : 'text-black-dark'}`}>
          {title}
        </p>
      </div>
      {/* if active, show text */}
      {activeCard === index && <p className="mt-6 text-[16px] text-white-main">{description}</p>}
    </div>
  );
};

export default HowItWorksCard;
