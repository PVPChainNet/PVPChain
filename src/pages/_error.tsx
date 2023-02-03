import Link from 'next/link';
import {NextPageContext} from 'next';

import ArrowBack from '@mui/icons-material/ArrowBack';

import PageContent from '@/components/page/content';
import Page from '@/components/page';

interface ErrorComponentProps {
  statusCode?: number;
}

function Error({statusCode}: ErrorComponentProps): JSX.Element {
  return (
    <Page blank header="Error">
      <PageContent contentPosition="center">
        <div className="max-w-xl flex flex-col items-center">
          <h1 className="text-3xl font-bold">Error Occurred</h1>
          <h2 className="text-xl text-center">
            {statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}
          </h2>
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

Error.getInitialProps = ({res, err}: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return {statusCode};
};

export default Error;
