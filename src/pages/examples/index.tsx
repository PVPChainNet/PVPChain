import {NextPage} from 'next';
import Link from 'next/link';

import Page from '@/components/page';
import PageContent from '@/components/page/content';
import BackButton from '@/components/utility/BackButton';

const Examples: NextPage = () => {
  return (
    <Page showNav={false} showConnectButton={false} header="Example Layouts">
      <PageContent contentPosition="center">
        <BackButton />
        <div className="my-4 text-2xl font-bold underline">Click on a layout below to view it:</div>
        <div className="grid grid-cols-4">
          <div>
            <h2 className="text-xl font-semibold text-brand-4">Page Layouts</h2>
            <ul className="list-disc list-inside">
              <li>
                <Link className="underline" href="/examples/layouts/just-content">
                  Just Content
                </Link>
              </li>
              <li>
                <Link className="underline" href="/examples/layouts/no-footer">
                  No Footer
                </Link>
              </li>
              <li>
                <Link className="underline" href="/examples/layouts/no-header">
                  No Header
                </Link>
              </li>
              <li>
                <Link className="underline" href="/examples/layouts/no-nav">
                  No Nav
                </Link>
              </li>
              <li>
                <Link className="underline" href="/examples/layouts/custom">
                  Choose Your Own Adventure!
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-brand-4">Connect Button</h2>
            <ul className="list-disc list-inside">
              <li>
                <Link className="underline" href="/examples/connect-button">
                  Connect Button
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-brand-4">Protected Examples</h2>
            <ul className="list-disc list-inside">
              <li>
                <Link className="underline" href="/examples/protected/protected-example">
                  Protected Component
                </Link>
              </li>
              <li>
                <Link className="underline" href="/examples/protected/protected-page">
                  Protected Page
                </Link>
              </li>
              <li>
                <Link className="underline" href="/examples/protected/admin-example">
                  Admin Page
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-brand-4">Starter Apps</h2>
            <ul className="list-disc list-inside">
              <li>Coming Soon!</li>
            </ul>
          </div>
        </div>
      </PageContent>
    </Page>
  );
};

export default Examples;
