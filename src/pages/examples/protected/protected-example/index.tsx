import React from 'react';
import {NextPage} from 'next';

import Page from '@/components/page';
import PageContent from '@/components/page/content';
import Protected from '@/components/utility/Protected';

const ProtectExample: NextPage = () => {
  return (
    <>
      <Page showAppHeader header="Protected Example">
        <PageContent contentPosition="center">
          <div className="mb-4">Non protected content can live here too.</div>
          <Protected>This content is protected</Protected>
        </PageContent>
      </Page>
    </>
  );
};

export default ProtectExample;
