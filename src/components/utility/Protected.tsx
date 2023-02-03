import {ReactNode, useEffect} from 'react';
import {useRouter} from 'next/router';
import classNames from 'classnames';

import Error from '@mui/icons-material/Error';

import {useIsAdmin, useUserWallet} from '@/hooks';

import ConnectButton from '@/components/utility/ConnectButton';
import LoadingWidget from '@/components/utility/LoadingWidget';
import PageBox from '@/components/page/box';

type ProtectedPropsT = {
  children: ReactNode;
  message?: string;
  warningMessage?: string;
  showWarning?: boolean;
  admin?: boolean;
  redirect?: boolean | string;
  warningBoxClassName?: string;
};

export default function Protected({
  children,
  message = 'You Must Connect Your Wallet!',
  showWarning = true,
  admin = false,
  redirect = false,
  warningBoxClassName,
}: ProtectedPropsT) {
  // Hooks
  const router = useRouter();
  const {isConnectedLocal} = useUserWallet();
  const {isAdmin, isCheckingAdmin, checkIsAdmin} = useIsAdmin();

  useEffect(() => {
    if (admin) checkIsAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [admin]);

  // Protected warning Message
  const ProtectedWarning = () => {
    return (
      <PageBox textAlignment="center" alignment="center" classNames={classNames('max-w-xl', warningBoxClassName)}>
        <Error className="h-16 w-16 text-brand-3 mx-auto" />
        <div className="text-2xl font-bold pt-2">{message}</div>
        <ConnectButton align="center" secondaryClass={true} className="mt-4" />
      </PageBox>
    );
  };

  const redirectUser = () => {
    const urlRedirectTo = typeof redirect === 'string' ? encodeURI(redirect) : redirect === true ? '/' : false;
    // Redirect the user, if one is provided, - If a string, redirect to the url, if a boolean is provided, redirect to the home page on true
    if (urlRedirectTo) router.push(urlRedirectTo);

    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingWidget textClasses="text-brand-5" message="Verifying Permissions" />
      </div>
    );
  };

  /*
   *
   * Admin Protected Related
   *
   */
  if (admin) {
    // If the page is on an admin page, wait until the user verified as an admin to render
    if (isCheckingAdmin)
      return (
        <div className="flex items-center justify-center">
          <LoadingWidget textClasses="text-brand-5" message="Verifying Permissions" />
        </div>
      );

    // If the user is on an admin page and we have verified if the user is not an admin and their is a redirect, redirect them
    if (!isAdmin && redirect) {
      redirectUser();
    }

    // If the user is on an admin page and we have verified if the user IS an admin, render the page
    if (isAdmin && isConnectedLocal) {
      return <>{children}</>;
    } else {
      return redirect ? redirectUser() : ProtectedWarning();
    }
  } else {
    /*
     *
     * Protected (non-admin) Related
     *
     */

    if (!isConnectedLocal) {
      if (showWarning) return ProtectedWarning();
    } else {
      return <>{children}</>;
    }
  }

  // User is still connecting, render nothing
  return <></>;
}
