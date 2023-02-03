import React from 'react';
import {NextPage} from 'next';

import Page from '@/components/page';
import PageContent from '@/components/page/content';
import PageBox from '@/components/page/box';
import BackButton from '@/components/utility/BackButton';

const JustContentHeader: NextPage = () => {
  return (
    <>
      <Page blank>
        <PageContent contentPosition="center">
          <BackButton className="mb-4" />
          <PageBox>
            <pre>
              {`<Page blank>
    <PageContent contentPosition="center">
      <div>...</div>
    </PageContent>
  </Page>`}
            </pre>
          </PageBox>
        </PageContent>
      </Page>
    </>
  );
};

export default JustContentHeader;
