import {NextPage} from 'next';
import Link from 'next/link';

import PageContent from '@/components/page/content';
import Page from '@/components/page';
import {useState} from 'react';

const Home: NextPage = () => {
  const [tableWatching, setTableWatching] = useState<number>(-1);

  const [tables, setTables] = useState<number[]>([0, 1, 2, 3, 4, 5]);

  const renderTables = () => {
    if (tableWatching === -1) {
      return (
        <div className="w-full text-xl text-brand-8 grid grid-cols-4 grid-rows-4 items-center mt-24">
          {tables.map((table, i) => {
            return (
              <div
                className="cursor-pointer border border-solid border-white text-center m-10 flex flex-col p-4"
                key={i}
                onClick={() => setTableWatching(i)}
              >
                <code className="mb-5">Table {i + 1}</code>
                <code>Buy In: 0.01 BNB</code>
                <code>Players: 2/6</code>
                <code>Time Remaining: 1m 37s</code>
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div
          className="cursor-pointer border border-solid border-white text-center text-brand-8 text-xl items-center p-2"
          onClick={() => setTableWatching(-1)}
        >
          Watching Table #{tableWatching}
        </div>
      );
    }
  };

  return (
    <Page blank>
      <PageContent contentPosition="center">
        <h1 className="text-4xl font-bold absolute top-10">Russian Roulette</h1>
        <hr />
        {/* <div className="w-full text-xl text-brand-8 grid grid-cols-4 grid-rows-4 items-center"> */}

        {renderTables()}
        {/* </div> */}
      </PageContent>
    </Page>
  );
};

export default Home;
