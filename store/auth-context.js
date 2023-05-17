import AsyncStorage from '@react-native-async-storage/async-storage';

import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
  user: '',
  isAuthenticated: true,
  authenticate: (user) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState('');

  function authenticate(user) {
    setAuthUser(user);
    AsyncStorage.setItem('user', user);
  }

  function logout() {
    setAuthUser(null);
    AsyncStorage.removeItem('user');
  }

  const value = {
    user: authUser,
    isAuthenticated: !!authUser,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
