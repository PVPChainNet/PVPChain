import Link from 'next/link';
import React from 'react';

import ArrowBack from '@mui/icons-material/ArrowBack';

import PageContent from '@/components/page/content';
import Page from '@/components/page';

function Custom500() {
  return (
    <Page header="Internal Error">
      <PageContent contentPosition="center">
        <div className="max-w-xl flex flex-col items-center">
          <h1 className="text-3xl font-bold">Error 500 - Server-side error occurred</h1>
          <h2 className="text-xl text-center">Sorry We Cannot Find the Page You Are Looking For</h2>
          <div className="flex items-center justify-center mt-4">
            <Link href="/" className="app-btn app-btn--primary">
              <ArrowBack className="h-4 w-4 mr-1" />
              Go Back Home
            </Link>
          </div>
        </div>
      </PageContent>
    </Page>
  );
}

export default Custom500;
