import React from 'react';
import {NextPage} from 'next';

import Page from '@/components/page';
import PageContent from '@/components/page/content';
import PageHeader from '@/components/page/header';
import PageBox from '@/components/page/box';
import BackButton from '@/components/utility/BackButton';

const NoHeaderHeader: NextPage = () => {
  return (
    <>
      <Page showAppHeader={false}>
        <PageHeader separator={false} />
        <PageContent contentPosition="center">
          <BackButton className="mb-4" />
          <PageBox>
            <pre>
              {`<Page showAppHeader={false}>
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

export default NoHeaderHeader;
