import React from 'react';
import {NextPage} from 'next';

import Page from '@/components/page';
import PageContent from '@/components/page/content';

const ProtectExample: NextPage = () => {
  return (
    <>
      <Page protect redirect header="Admin Redirect Page">
        <PageContent>
          <div>You will not get to this page unless you connect your wallet and are an admin!</div>
        </PageContent>
      </Page>
    </>
  );
};

export default ProtectExample;
