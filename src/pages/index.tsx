import {NextPage} from 'next';
import Link from 'next/link';

import PageContent from '@/components/page/content';
import Page from '@/components/page';

const Home: NextPage = () => {
  return (
    <Page blank>
      <PageContent contentPosition="center">
        <h1 className="text-4xl font-bold mb-2">Dappd NextJs Seed Application</h1>
        <hr />
        <p className="text-lg">Use the links below to explore the app:</p>
        <div className="w-full">
          <ul className="space-y-4 mt-4 list-none max-w-3xl mx-auto flex flex-col items-center text-3xl text-brand-8">
            <li>
              <Link href={'/examples'} className="underline">
                Examples
              </Link>
            </li>
            <li>
              <Link href={'/starters'} className="underline">
                Starter Apps
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-full mt-12">
          <small className="block text-center">
            ~ Made With <span className="text-red-500">&#10084;</span> <span className="font-bold">by</span> and{' '}
            <span className="font-bold">for</span> Dappd ~
          </small>
        </div>
      </PageContent>
    </Page>
  );
};

export default Home;
