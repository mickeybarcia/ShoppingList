import AppContext from './AppContext';

import React from 'react';

const useAppContext = () => {
  return React.useContext(AppContext);
};

export default useAppContext;
