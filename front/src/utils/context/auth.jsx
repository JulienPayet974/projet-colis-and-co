import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const userDataString = localStorage.getItem('colisandcoUserData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUserData(userData);
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  const login = (userData) => {
    localStorage.setItem('colisandcoUserData', JSON.stringify(userData));
    setIsLoggedIn(true);
    setUserData(userData);
  };

  const logout = () => {
    localStorage.removeItem('colisandcoUserData');
    setIsLoggedIn(false);
    setUserData({});
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userData,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
