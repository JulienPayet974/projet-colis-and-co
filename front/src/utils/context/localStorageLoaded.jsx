import { createContext, useState } from "react";

export const LocalStorageLoadedContext = createContext();

export const LocalStorageLoadedProvider = ({ children }) => {
  const [localStorageLoaded, setLocalStorageLoaded] = useState(false);

  return (
    <LocalStorageLoadedContext.Provider
      value={{ localStorageLoaded, setLocalStorageLoaded }}
    >
      {children}
    </LocalStorageLoadedContext.Provider>
  );
};
