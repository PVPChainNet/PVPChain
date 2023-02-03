import {useState} from 'react';

import SearchContext from '@/contexts/SearchContext';

export const SearchContextProvider = ({children}: {children: React.ReactNode}) => {
  const [search, _setSearch] = useState('');
  const setSearch = (queryString: string) => _setSearch(queryString);

  return <SearchContext.Provider value={{search, setSearch}}>{children}</SearchContext.Provider>;
};
