import {Image, Text} from "react-native";
import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";


import Home from "./Home";
import Projects from "./Projects";
import Tasks from "./Tasks";
import Profile from "./Profile";
import ProjectDetails from "./ProjectDetails";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const Navigation = () => {


    return (
        <>

       {/* <NavigationContainer>
            <Stack.Navigator>

                <Stack.Screen name="Projects" component={Projects} />
                <Stack.Screen name="ProjectDetails" component={ProjectDetails} />

            </Stack.Navigator>
        </NavigationContainer>*/}
        </>
    );
}
const CurrentScreen=({tabTitle})=>{



    return (
        < >
            <Text style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: 'black',
                paddingTop: 20
            }}>{tabTitle}</Text>
            {
                ( tabTitle=="Accueil")&& <Home/>

            }
            {
                ( tabTitle=="Mes projets")&& (  <Navigation/>)



            }
            {
                ( tabTitle=="Taches reçues")&& <Tasks/>

            }
            {
                ( tabTitle=="Profile")&& <Profile/>

            }


        </>
    );
}
export default CurrentScreen