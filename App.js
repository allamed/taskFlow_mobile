import 'react-native-gesture-handler';
import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import IconButton from './components/ui/IconButton';

import Home from "./screens/Home";
import Projects from "./screens/Projects";
import Profile from "./screens/Profile";
import Sidebar from "./screens/Sidebar";
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";
import Tasks from "./screens/Tasks";
import {getAllProjects} from "./features/project/projectSlice";
import {store} from "./store";
import {Provider} from "react-redux";
import {Icon} from "@rneui/themed";

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#0097e6" },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: "#f5f6fa" },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}


function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
    const CustomDrawerContent = (props) => {
        return(
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem
                    label="Logout"
                    onPress={() => {authCtx.logout()}}
                    icon={() => <Icon name="logout" color="#000" size={24} />}
                />
            </DrawerContentScrollView>
        );
    }
  return (
    /*<Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Home"
        component={Main}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
        }}
      />

    </Stack.Navigator>*/
      <Provider store={store}>
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props}
      options={{
            headerRight: ({ tintColor }) => (
                <IconButton
                    icon="exit"
                    color={tintColor}
                    size={24}
                    onPress={authCtx.logout}
                />
            ),
      }
        }

      />}>

          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Projects" component={Projects}/>
          <Drawer.Screen name="Profile" component={Profile} />
          <Drawer.Screen name="Tasks" component={Tasks} />


      </Drawer.Navigator>
          </Provider >
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
{/*      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}*/}
<AuthenticatedStack />
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchUser() {
      const email = await AsyncStorage.getItem('email');
        const password = await AsyncStorage.getItem('password');

      if (email && password) {
          console.log("app js "+ email + " "+ password);
        authCtx.authenticate({ email, password});
      }
        console.log("app js "+ email + " "+ password);
      setIsTryingLogin(false);
    }

    fetchUser();
  }, []);

  if (isTryingLogin) {
    return <AppLoading />;
  }

  return <Navigation />;
}

export default function App() {
  
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
