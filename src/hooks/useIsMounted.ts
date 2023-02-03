import React, {useEffect} from 'react';

export function useIsMounted() {
  const [isMounted, setMounted] = React.useState(false);
  useEffect(() => setMounted(true), []);
  return {isMounted};
}
