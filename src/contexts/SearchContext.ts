import {createContext} from 'react';

type SearchContextT = {
  search: string;
  setSearch: (search: string) => void;
};

const SearchContext = createContext({} as SearchContextT);

export default SearchContext;
