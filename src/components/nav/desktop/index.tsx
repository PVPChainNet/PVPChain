import {useRouter} from 'next/router';
import Link from 'next/link';
import classNames from 'classnames';

import {menuItems, externalLinks} from '@/typescript/menuItems';

import {ArrowTopRightOnSquareIcon} from '@heroicons/react/24/outline';

import CompanyLogo from '@/components/utility/CompanyLogo';

export default function Nav() {
  const router = useRouter();

  return (
    <>
      <div className="app-nav-sidebar app-nav-sidebar--desktop">
        <div className="mb-10">
          <div className="relative px-6 mt-8">
            <Link href="/">
              <CompanyLogo height={75} width={175} />
            </Link>
          </div>
        </div>
        <nav>
          <div className="sr-only">Navigation</div>
          <ul>
            {menuItems.map((menuItem, index) => (
              <li className="app-nav-items" key={index}>
                <Link
                  href={menuItem.link}
                  className={classNames('app-nav-item', {'app-nav-item--active': router.pathname === menuItem.link})}
                >
                  <span className="app-nav-item-icon">{menuItem.icon}</span>
                  <span className="app-nav-item-icon app-nav-item-icon--active hidden">
                    {menuItem.activeIcon ? menuItem.activeIcon : menuItem.icon}
                  </span>
                  <span className="app-nav-item-text">{menuItem.name}</span>
                </Link>
              </li>
            ))}
            {externalLinks.map((menuItem, index) => (
              <li className="app-nav-items" key={index}>
                <Link href={menuItem.link} className={'app-nav-item'}>
                  <span className="app-nav-item-icon">{menuItem.icon}</span>
                  <span className="app-nav-item-icon app-nav-item-icon--active hidden">
                    {menuItem.activeIcon ? menuItem.activeIcon : menuItem.icon}
                  </span>
                  <span className="app-nav-item-text">{menuItem.name}</span>
                  <ArrowTopRightOnSquareIcon className="ml-2 h-4 w-4" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
