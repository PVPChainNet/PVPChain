import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next';
import PageContent from '../../../components/page/content';
import Page from '../../../components/page';
import Link from 'next/link';

type HomePagePropsT = {props: {aid: number}};

const GamePage: NextPage = ({aid}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Page showConnectButton={true} showNav={false} showAppFooter={false} showAppHeader={false}>
      <PageContent contentPosition="center">
        <h1 className="text-4xl font-bold absolute top-10">Game {aid}</h1>
        <hr />

        <Link href={'/roulette'} className="border border-white p-2 absolute bottom-4">
          Go Back
        </Link>
      </PageContent>
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
