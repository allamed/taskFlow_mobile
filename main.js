import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import profile from './assets/profile.png';
// Tab ICons...
import {Provider, useDispatch} from "react-redux";
import { store } from "./store";
// Menus
import menu from './assets/menu.png';
import close from './assets/close.png';

// Photo
import profileImage from './assets/profile.jpeg';
import {TabButton} from "./components/TabButton";
import {Profile} from "./components/profile";
import CurrentScreen from "./screens/CurrentScreen";
import {logOutTab, tabs} from "./utils/tabs";
import {Overlay} from "@rneui/base";
import Sidebar from "./screens/Sidebar";
import {getAllProjects} from "./features/project/projectSlice";

export default function Main() {
  const [currentTab, setCurrentTab] = useState("Accueil");
  // To get the curretn Status of menu ...
  const [showMenu, setShowMenu] = useState(false);

  // Animated Properties...
    const offsetValue = useRef(new Animated.Value(0)).current;
    // Scale Intially must be One...
    const scaleValue = useRef(new Animated.Value(1)).current;
    const closeButtonOffset = useRef(new Animated.Value(0)).current;

return(
    <Provider store={store}>
        <SafeAreaView style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="#D6A2E8"
            />

            <View style={{ justifyContent: 'flex-start', padding: 15 }}>
                <Sidebar currenttab={currentTab} setCurrentTab={setCurrentTab} />

            </View>

            {
                // Over lay View...
            }

            {/*<Overlay showMenu={showMenu} setShowMenu={setShowMenu} offsetValue={offsetValue} scaleValue={scaleValue} closeButtonOffset={closeButtonOffset} />
*/}
            <Animated.View style={{
                flexGrow: 1,
                backgroundColor: 'white',
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                paddingHorizontal: 15,
                paddingVertical: 20,
                borderRadius: showMenu ? 15 : 0,
                // Transforming View...
                transform: [
                    { scale: scaleValue },
                    { translateX: offsetValue }
                ]
            }}>

                {
                    // Menu Button...
                }

                <Animated.View style={{
                    transform: [{
                        translateY: closeButtonOffset
                    }]
                }}>
                    <TouchableOpacity onPress={() => {

                        // Do Actions Here....
                        // Scaling the view...
                        Animated.timing(scaleValue, {
                            toValue: showMenu ? 1 : 0.88,
                            duration: 300,
                            useNativeDriver: true
                        })
                            .start()

                        Animated.timing(offsetValue, {
                            // YOur Random Value...
                            toValue: showMenu ? 0 : 230,
                            duration: 300,
                            useNativeDriver: true
                        })
                            .start()

                        Animated.timing(closeButtonOffset, {
                            // YOur Random Value...
                            toValue: !showMenu ? -30 : 0,
                            duration: 300,
                            useNativeDriver: true
                        })
                            .start()

                        setShowMenu(!showMenu);
                    }}>

                        <Image source={showMenu ? close : menu} style={{
                            width: 20,
                            height: 20,
                            tintColor: 'black',
                            marginTop: 40,

                        }}></Image>

                    </TouchableOpacity>

                    <CurrentScreen tabTitle={currentTab}/>


                </Animated.View>

            </Animated.View>
        </SafeAreaView>

    </Provider >
);


}

// For multiple Buttons...


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8e44ad',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
