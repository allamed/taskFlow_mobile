import {Image, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {Icon} from "@rneui/themed";
import {getAllProjects} from "../features/project/projectSlice";
import {useDispatch} from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const TabButton =({currentTab, setCurrentTab, text, icon} )=>{
    useEffect(() => {
        async function fetchUser() {
            const email = await AsyncStorage.getItem('email');            // convert to object format
            setUserEmail(email);
           // console.log(" tab b ", email);

        }

        fetchUser();

    }, []);
    const [userEmail, setUserEmail]=useState("");

    const dispatch = useDispatch();





    return (
<>
        <TouchableOpacity onPress={() => {
            if (text == "LogOut") {
                // Do your Stuff...
            } else {
                setCurrentTab(text)
            }
            if (text == "Mes projets") {
                dispatch(getAllProjects(userEmail));
            }
        }}>
            <View style={{
                flexDirection: "row",
                alignItems: 'center',
                paddingVertical: 8,
                backgroundColor: currentTab == text ? 'white' : 'transparent',
                paddingLeft: 13,
                paddingRight: 35,
                borderRadius: 8,
                marginTop: 15
            }}>

                {/*<Image source={icon} style={{
                    width: 25, height: 25,
                    tintColor: currentTab == text ? "#5359D1" : "white"
                }}></Image>*/}
                <Icon
                    name={icon} color={currentTab == text ? "#5359D1" : "white"} />

                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    paddingLeft: 15,
                    color: currentTab == text ? "#5359D1" : "white"
                }}>{text}</Text>

            </View>
        </TouchableOpacity>
</>
    );
}