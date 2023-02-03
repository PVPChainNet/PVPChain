import React from 'react';
import {NextPage} from 'next';

import Page from '@/components/page';
import PageContent from '@/components/page/content';

const ProtectedPageExample: NextPage = () => {
  return (
    <>
      <Page protect showAppHeader header="Protected Example">
        <PageContent contentPosition="center">
          <div>The entire page is protected</div>
        </PageContent>
      </Page>
    </>
  );
};

export default ProtectedPageExample;
