import FingerprintIcon from '@mui/icons-material/Fingerprint';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import LinkIcon from '@mui/icons-material/Link';
import GitHub from '@mui/icons-material/GitHub';
import Home from '@mui/icons-material/Home';
import LockReset from '@mui/icons-material/LockReset';
import {ClipboardDocumentCheckIcon, LockClosedIcon} from '@heroicons/react/24/solid';
import {LockOpenIcon, PaintBrushIcon} from '@heroicons/react/24/outline';

interface MenuItemI {
  name: string;
  icon: JSX.Element;
  activeIcon?: JSX.Element;
  link: string;
}

export const menuItems: MenuItemI[] = [
  {name: 'Home', icon: <Home />, link: '/'},
  {name: 'Protected Example', icon: <LockClosedIcon />, link: '/examples/protected/protected-example'},
  {name: 'Protected Page Example', icon: <LockClosedIcon />, link: '/examples/protected/protected-page'},
  {
    name: 'Admin Example',
    icon: <LockOpenIcon />,
    link: '/examples/protected/admin-example',
  },
  {name: 'No Nav', icon: <LockReset />, link: '/examples/layouts/no-nav'},
  {name: 'No Header', icon: <FingerprintIcon />, link: '/examples/layouts/no-header'},
  {name: 'No Footer', icon: <ClipboardDocumentCheckIcon />, link: '/examples/layouts/no-footer'},
  {name: 'Just Content', icon: <FindInPageIcon />, link: '/examples/layouts/just-content'},
  {name: 'Custom', icon: <PaintBrushIcon />, link: '/examples/layouts/custom'},
];
export const externalLinks: MenuItemI[] = [
  {name: 'dappd', icon: <LinkIcon />, link: 'https://dappd.net'},
  {name: 'dappd GitHub', icon: <GitHub />, link: 'https://github.com/orgs/dappd-net/dashboard'},
];
