import {useState} from 'react';

import PageContext from '@/contexts/PageContext';

export const PageContextProvider = ({children}: {children: React.ReactNode}) => {
  const [name, _setName] = useState('');
  const setName = (newName: string) => _setName(newName);

  const [showConnectButton, _setShowConnectButton] = useState(true);
  const setShowConnectButton = (show: boolean) => _setShowConnectButton(show);

  const [showNav, _setShowNav] = useState(true);
  const setShowNav = (show: boolean) => _setShowNav(show);

  const [bgClass, _setBgClass] = useState('bg-white');
  const setBgClass = (newName: string) => _setBgClass(newName);

  const [textClass, _setTextClass] = useState('text-black');
  const setTextClass = (newName: string) => _setTextClass(newName);

  return (
    <PageContext.Provider
      value={{
        name,
        setName,
        showConnectButton,
        setShowConnectButton,
        showNav,
        setShowNav,
        bgClass,
        setBgClass,
        textClass,
        setTextClass,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
