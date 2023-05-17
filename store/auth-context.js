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

  async function authenticate(user) {
    setAuthUser(user);


   await AsyncStorage.setItem('email', user.email);
    await AsyncStorage.setItem('password', user.password);

  }

  async function logout() {
    setAuthUser(null);
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('password');
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
