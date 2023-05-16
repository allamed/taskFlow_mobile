import {Profile} from "../components/profile";
import profileImage from "../assets/profile.jpeg";
import {View} from "react-native";
import {logOutTab, tabs} from "../utils/tabs";
import {TabButton} from "../components/TabButton";
import React from "react";
import {Provider} from "react-redux";
import {store} from "../store";

const Sidebar=({currentTab, setCurrentTab})=>{
    return (
        <>
        <Profile name="Allamed" profileImage={profileImage}/>

    <View style={{ flexGrow: 1, marginTop: 50 }}>

        {
            // Tab Bar Buttons....
        }
        {
            tabs.map(item=>{
                return (

                    <TabButton currentTab={currentTab} setCurrentTab={setCurrentTab} text={item.text} icon={item.icon} key={item.id}></TabButton>);
                   })
        }


    </View>

    <View>

        <TabButton currentTab={currentTab} setCurrentTab={setCurrentTab} text={logOutTab.text} icon={logOutTab.icon} key={logOutTab.id}></TabButton>

    </View>
        </>
    );
}
export default Sidebar;