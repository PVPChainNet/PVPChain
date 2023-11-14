import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next';
import Page from '@/components/page';
import {useSidebar} from '@/contexts/SidebarContext';
import {useEffect, useState} from 'react';
import ActionButtonItem from '../../../components/buttons/ActionButton';
import {use} from 'chai';

type HomePagePropsT = {props: {aid: number}};

interface PredictionMarketInfo {
  prizePool: number;
  lockedPrice: number;
  closedPrice: number;
  result: number;
  payoutDown: number;
  payoutUp: number;
  wasDown?: boolean;
}

const GamePage: NextPage = ({aid}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const sidebarStateActive = useSidebar();

  const [currentMode, setCurrentMode] = useState('BNB - 1 Day');
  const [timeRemainingMiliseconds, setTimeRemainingMiliseconds] = useState(0);
  const [previousPredictionResult, setPreviousPredictionResult] = useState<PredictionMarketInfo>();
  const [livePredictionInfo, setLivePredictionInfo] = useState<PredictionMarketInfo>();
  const [upcomingPredictionInfo, setUpcomingPredictionInfo] = useState<PredictionMarketInfo>();
  const [hasUserEnteredPrediction, setHasUserEnteredPrediction] = useState(false);
  const [hasUserEnteredUp, setHasUserEnteredUp] = useState(false);

  {
    /* get prediction information */
  }
  useEffect(() => {
    //previous prediction result
    setPreviousPredictionResult({
      prizePool: 4.77,
      lockedPrice: 1.1453,
      closedPrice: 1.1444,
      result: -0.0009,
      payoutDown: 1.3,
      payoutUp: 0.8,
      wasDown: false,
    });

    //live prediction information
    setLivePredictionInfo({
      prizePool: 4.77,
      lockedPrice: 1.1453,
      closedPrice: 1.1444,
      result: -0.0009,
      payoutDown: 1.3,
      payoutUp: 0.8,
    });

    //upcoming prediction information
    setUpcomingPredictionInfo({
      prizePool: 4.77,
      lockedPrice: 1.1453,
      closedPrice: 1.1444,
      result: -0.0009,
      payoutDown: 1.3,
      payoutUp: 0.8,
    });

    //set timer for live prediction
    setTimeRemainingMiliseconds(100000);
  }, []);

  //reduce timer every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemainingMiliseconds(timeRemainingMiliseconds - 1000);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemainingMiliseconds]);

  const handleModeChange = () => (e: any) => {
    setCurrentMode(e.target.value);
  };

  const handleEnterVote = (enterUp: boolean) => () => {
    setHasUserEnteredPrediction(true);
    setHasUserEnteredUp(enterUp);
  };

  return (
    <Page showConnectButton={true} showNav={false} showAppFooter={false} showAppHeader={false}>
      <div className={`${sidebarStateActive ? 'sidebarActive' : 'transition-all duration-300'}`}>
        <div className="mt-24 mx-[4.5rem]">
          <h4 className="text-brand-green mb-11">Prediction Market</h4>
          {/* modes */}
          <select onChange={handleModeChange()} className="h-12 my-auto rounded-lg bg-slate-main flex justify-evenly">
            <option value="" disabled selected>
              Change Mode
            </option>
            <option value="BNB - 1 Day" className="title24">
              BNB - 1 Day
            </option>
            <option value="BNB - 7 Days" className="title24">
              BNB - 7 Days
            </option>
            <option value="ETH - 1 Day" className="title24">
              ETH - 1 Day
            </option>
            <option value="ETH - 7 Days" className="title24">
              ETH - 7 Days
            </option>
          </select>
          <h4 className="w-full text-center mt-4 mb-12">{currentMode}</h4>

          {/* main market section */}
          <section
            className={`flex flex-col justify-center w-full ${
              sidebarStateActive ? 'lg:flex-row gap-8' : 'md:flex-row gap-8'
            }`}
          >
            {/* expired prediction */}
            <div className="mt-12 w-[372px]">
              <p className="mb-2 title24">Expired</p>
              <div
                className={`bg-slate-light rounded-lg px-5 py-3 border-4 ${
                  previousPredictionResult?.wasDown === true ? 'border-brand-pink' : 'border-brand-green'
                }`}
              >
                {' '}
                {/* card */}
                <div className="flex flex-row justify-between align-middle pt-3">
                  {' '}
                  {/* prize pool row */}
                  <p className="title24 my-auto">Prize Pool: </p>
                  <p className="text-3xl font-medium uppercase my-auto">4.7700 BNB</p>
                </div>
                <hr className="border-gray-700 border-2 mx-0 mt-2" />
                <div className="flex flex-row justify-around align-middle pt-9">
                  {' '}
                  {/* prices */}
                  <p className="body16Regular my-auto">Locked Price: </p>
                  <p className="body20 my-auto">$1.1453</p>
                </div>
                <div className="flex flex-row justify-around align-middle pt-4">
                  {' '}
                  {/* prices */}
                  <p className="body16Regular my-auto">Closed Price: </p>
                  <p className="body20 my-auto">$1.1444</p>
                </div>
                <button
                  className={`flex justify-center gap-8 align-middle mt-10 mb-6 h-12 w-full rounded-lg ${
                    previousPredictionResult?.wasDown ? 'bg-brand-pink' : 'bg-brand-green text-black-main'
                  }`}
                >
                  {' '}
                  {/* result */}
                  <p className={`body16Medium my-auto `}>Result: </p>
                  <p className="title20 my-auto">$-0.0009</p>
                </button>
                <p className="body20 text-center pt-4">Payouts</p>
                <div className="my-4 flex flex-row justify-center align-middle h-12 w-3/4 m-auto">
                  <div
                    className={`basis-1/2 bg-brand-pink rounded-l-lg w-full h-full flex justify-center align-middle ${
                      previousPredictionResult?.wasDown === false ? 'bg-opacity-50' : ''
                    }`}
                  >
                    <p className="body16Regular m-auto">{previousPredictionResult?.payoutDown}x</p>
                  </div>
                  <div
                    className={`basis-1/2 bg-brand-green text-black rounded-r-lg w-full h-full flex justify-center align-middle ${
                      previousPredictionResult?.wasDown === true ? 'bg-opacity-50' : ''
                    }`}
                  >
                    <p className="body16Regular m-auto">{previousPredictionResult?.payoutUp}x</p>
                  </div>
                </div>
              </div>
            </div>

            {/* live prediction */}
            <div className="w-[428px]">
              <p className="mb-2 text-brand-green text-4xl font-medium">Live</p>
              <div className="bg-slate-light rounded-lg px-5 py-3">
                {' '}
                {/* card */}
                <div className="flex flex-row justify-between align-middle pt-3">
                  {' '}
                  {/* prize pool row */}
                  <p className="title24 my-auto">Prize Pool: </p>
                  <p className="text-3xl font-medium uppercase my-auto">4.7700 BNB</p>
                </div>
                <hr className="border-gray-700 border-2 mx-0 mt-2" />
                <div className="flex flex-row justify-around align-middle pt-9">
                  {' '}
                  {/* prices */}
                  <p className="body16Regular my-auto">Locked Price: </p>
                  <p className="body20 my-auto">$1.1453</p>
                </div>
                <div className="flex flex-row justify-around align-middle pt-4">
                  {' '}
                  {/* prices */}
                  <p className="body16Regular my-auto">Closed Price: </p>
                  <p className="body20 my-auto">$1.1444</p>
                </div>
                <p className="body20 text-center pt-4">Payouts</p>
                <div className="my-4 flex flex-row justify-center align-middle h-12 w-3/4 m-auto">
                  <div
                    className={`basis-1/2 bg-brand-pink rounded-l-lg w-full h-full flex justify-center align-middle ${
                      previousPredictionResult?.wasDown === false ? 'bg-opacity-50' : ''
                    }`}
                  >
                    <p className="body16Regular m-auto">{previousPredictionResult?.payoutDown}x</p>
                  </div>
                  <div
                    className={`basis-1/2 bg-brand-green text-black rounded-r-lg w-full h-full flex justify-center align-middle ${
                      previousPredictionResult?.wasDown === true ? 'bg-opacity-50' : ''
                    }`}
                  >
                    <p className="body16Regular m-auto">{previousPredictionResult?.payoutUp}x</p>
                  </div>
                </div>
              </div>

              {/* timer */}
              <p className="text-3xl font-medium text-center mt-6 mb-4">{timeRemainingMiliseconds}</p>
              <div className={`mx-8 border-white border-2 h-11 rounded-lg`}>
                <div className={`bg-brand-blue h-full rounded-lg w-[${timeRemainingMiliseconds / 1000}%]`}></div>
              </div>
            </div>

            {/* upcoming prediction */}
            <div className="mt-12 w-[372px]">
              <p className="mb-2 title24">Upcoming</p>
              <div
                className={`bg-slate-light rounded-lg h-[380px] px-5 py-3 ${
                  hasUserEnteredPrediction && hasUserEnteredUp ? 'border-2 border-brand-green' : ''
                } ${hasUserEnteredPrediction && !hasUserEnteredUp ? 'border-2 border-brand-pink' : ''}`}
              >
                {' '}
                {/* card */}
                <div className={`flex flex-row justify-between align-middle pt-3`}>
                  {' '}
                  {/* prize pool row */}
                  <p className="title24 my-auto">Prize Pool: </p>
                  <p className="text-3xl font-medium uppercase my-auto">4.7700 BNB</p>
                </div>
                <hr className="border-gray-700 border-2 mx-0 mt-2" />
                {!hasUserEnteredPrediction ? (
                  <div className="my-12 mx-10 flex flex-col gap-8">
                    <button onClick={handleEnterVote(true)}>
                      <ActionButtonItem text="Enter Up" color="blue" link="" />
                    </button>
                    <button onClick={handleEnterVote(false)}>
                      <ActionButtonItem text="Enter Down" color="pink" link="" />
                    </button>
                  </div>
                ) : (
                  <div
                    className={`w-full rounded-lg mt-14 py-8 text-center ${
                      hasUserEnteredUp ? 'bg-brand-green text-black' : 'bg-brand-pink text-white-main'
                    }`}
                  >
                    <p className="text-3xl font-medium mb-4">{hasUserEnteredUp ? 'Entered Up' : 'Entered Down'}</p>
                    <p className="title20">Starting in: {timeRemainingMiliseconds}</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* how it works section */}
          <section className={`mt-12 px-4 gap-8 max-w-6xl py-6 flex justify-center`}>
            <div className="bg-slate-light rounded-lg max-w-2xl">
              <p className="body16Medium mx-6 mt-6">How it works</p>
              <p className="title24 m-6">
                When you buy points there is a randomized +50% to -50% chance of how many points you will receive.
                Points can be used to play games, join the lottery, or be placed into the revenue pool to generate money
                as the house.
              </p>
            </div>
          </section>
        </div>
      </div>
    </Page>
  );
};

export const getServerSideProps: GetServerSideProps = async function ({params}) {
  // Set default props, returning 0
  const returnProps: HomePagePropsT = {props: {aid: 0}};
  // console.log('params', params)
  returnProps.props.aid = params?.aid ? parseInt(params.aid[0] as string) : 0;
  // if returnProps.props.aid is not a number, return 0
  if (isNaN(returnProps.props.aid)) {
    returnProps.props.aid = 0;
  }
  // console.log('returnProps', returnProps)
  return returnProps;
};

export default GamePage;
