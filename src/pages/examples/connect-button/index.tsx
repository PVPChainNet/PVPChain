import React from 'react';
import {NextPage} from 'next';

import Page from '@/components/page';
import PageBox from '@/components/page/box';
import PageContent from '@/components/page/content';
import BackButton from '@/components/utility/BackButton';
import ConnectButton from '@/components/utility/ConnectButton';

const ConnectButtonExample: NextPage = () => {
  return (
    <>
      <Page showAppFooter={false} header="Connect Button">
        <PageContent contentPosition="center">
          <BackButton className="mb-4" />
          <p>The below button is the same that is used in the header.</p>
          <ConnectButton className="mt-4" />
          <PageBox classNames="mt-4">
            <pre>
              {`<Page showAppFooter={false} header="Connect Button">
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

export default ConnectButtonExample;
