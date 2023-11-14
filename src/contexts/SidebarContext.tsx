import React, {useContext, useState} from 'react';

const SidebarContext = React.createContext<boolean>(true);
const SidebarUpdateContext = React.createContext<() => void>(() => {
  console.log('SidebarUpdateContext');
});

export function useSidebar() {
  return useContext(SidebarContext);
}

export function useSidebarUpdate() {
  return useContext(SidebarUpdateContext);
}

export function SidebarProvider({children}: {children: React.ReactNode}) {
  const [isSidebarActive, setIsSidebarOpen] = useState(true);

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarActive);
  }

  return (
    <SidebarContext.Provider value={isSidebarActive}>
      <SidebarUpdateContext.Provider value={toggleSidebar}>{children}</SidebarUpdateContext.Provider>
    </SidebarContext.Provider>
  );
}
