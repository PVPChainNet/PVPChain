import classNames from 'classnames';
import React from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  className?: string;
}

function TabPanel({children, value, index, className}: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} className={classNames(className)}>
      {value === index && <>{children}</>}
    </div>
  );
}

export default TabPanel;
