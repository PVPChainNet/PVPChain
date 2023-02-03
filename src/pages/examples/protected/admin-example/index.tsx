import React from 'react';
import {NextPage} from 'next';
import Link from 'next/link';

import Page from '@/components/page';
import PageContent from '@/components/page/content';
import Protected from '@/components/utility/Protected';

const AdminExample: NextPage = () => {
  return (
    <>
      <Page showAppHeader header="Admin Example">
        <PageContent contentPosition="center" className="p-4">
          <div>This is the admin example page content</div>
          <div>
            Click this link to go to the redirect page.
            <Link href="/examples/admin-example/redirect" className="underline ml-1">
              Click Here
            </Link>
          </div>
          <div>The below is only available if you have your wallet connected and are an admin</div>
          <div className="font-bold text-lg">You are an admin if you are the owner of the contract</div>
          <Protected admin message="You Are Not An Admin!" warningBoxClassName="mt-4">
            This content is admin protected
          </Protected>
        </PageContent>
      </Page>
    </>
  );
};

export default AdminExample;
