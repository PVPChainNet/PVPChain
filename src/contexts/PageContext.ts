import {createContext} from 'react';

type PageContextT = {
  name: string;
  setName: (name: string) => void;

  showConnectButton: boolean;
  setShowConnectButton: (show: boolean) => void;

  showNav: boolean;
  setShowNav: (show: boolean) => void;

  bgClass: string;
  setBgClass: (name: string) => void;

  textClass: string;
  setTextClass: (name: string) => void;
};

const PageContext = createContext({} as PageContextT);

export default PageContext;
