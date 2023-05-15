import {Animated, Image, TouchableOpacity} from "react-native";
import close from "../assets/close.png";
import menu from "../assets/menu.png";
import CurrentScreen from "./CurrentScreen";
import React, {useRef} from "react";
const OverLay=({showMenu, setShowMenu, offsetValue, scaleValue,  closeButtonOffset})=>{

return (<Animated.View style={{
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

</Animated.View>);
}