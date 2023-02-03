import {createContext} from 'react';

type MenuContextT = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const MenuContext = createContext({} as MenuContextT);

export default MenuContext;
