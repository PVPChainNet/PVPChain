import {useContext} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import classNames from 'classnames';

import {ArrowTopRightOnSquareIcon} from '@heroicons/react/24/outline';

import MenuContext from '@/contexts/MenuContext';

import {menuItems, externalLinks} from '@/typescript/menuItems';

import CompanyLogo from '@/components/utility/CompanyLogo';

export default function NavMobile() {
  const router = useRouter();
  const {isOpen, setIsOpen} = useContext(MenuContext);

  return (
    <>
      <div className={classNames('app-nav-sidebar app-nav-sidebar--mobile', {'!-left-full opacity-0': !isOpen})}>
        <div className="my-2">
          <div className="relative p-4 flex flex-col justify-center items-center">
            <Link href="/">
              <CompanyLogo height={39} width={145} />
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
                  onClick={() => {
                    setIsOpen(!isOpen);
                    router.push(menuItem.link);
                  }}
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
                <Link
                  href={menuItem.link}
                  className={'app-nav-item'}
                  onClick={() => {
                    setIsOpen(!isOpen);
                    router.push(menuItem.link);
                  }}
                >
                  <span className="app-nav-item-icon">{menuItem.icon}</span>
                  <span className="app-nav-item-icon app-nav-item-icon--active hidden">
                    {menuItem.activeIcon ? menuItem.activeIcon : menuItem.icon}
                  </span>
                  <ArrowTopRightOnSquareIcon className="ml-2 h-4 w-4" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div
        className={classNames('app-nav-mobile-overlay', {'!hidden': !isOpen})}
        onClick={() => setIsOpen(!isOpen)}
      ></div>
    </>
  );
}
