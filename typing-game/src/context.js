import { useContext, useState } from "react";
import React from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [popIntervalContext, setPopIntervalContext] = useState(1000);

  return (
    <AppContext.Provider value={{ popIntervalContext, setPopIntervalContext }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
