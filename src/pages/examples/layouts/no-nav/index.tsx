import React from 'react';
import {NextPage} from 'next';

import Page from '@/components/page';
import PageContent from '@/components/page/content';
import BackButton from '@/components/utility/BackButton';
import PageBox from '@/components/page/box';

const NoNavExample: NextPage = () => {
  return (
    <>
      <Page showNav={false} header="No Nav">
        <PageContent contentPosition="center">
          <BackButton className="mb-4" />
          <PageBox>
            <pre>
              {`<Page showNav={false}>
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

export default NoNavExample;
