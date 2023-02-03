import {useState} from 'react';

import MenuContext from '@/contexts/MenuContext';

export const MenuContextProvider = ({children}: {children: React.ReactNode}) => {
  const [open, _setOpen] = useState(false);
  const setOpen = (open: boolean) => _setOpen(open);

  return <MenuContext.Provider value={{isOpen: open, setIsOpen: setOpen}}>{children}</MenuContext.Provider>;
};
