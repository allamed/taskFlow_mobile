import React, {useState} from 'react';
import {View, Button, Platform, Image, Dimensions} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {task} from "../assets/tasks5.png"

const  Home = ({navigation}) => {

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
    return (
        <View style={{flex: 1, backgroundColor:"white", borderTopWidth:0.3, borderColor:"gray"}}>
            <View style={{flex:1}}>
                <View >
                    <Image
                        source={require("../assets/projects.png")}
                        style={{ alignSelf:"center", width:screenWidth, height:screenHeight*0.4}}
                    />
                </View>
                <Button  onPress={()=>{
                    navigation.navigate("Projects")
                }
                } title="Manage my projects" />
            </View>
            <View style={{flex:1}}>
                <View >
                    <Image
                        source={require("../assets/tasks5.png")}
                        style={{ alignSelf:"center", width:screenWidth, height:screenHeight*0.4}}
                    />
                </View>
                <Button onPress={()=>{
                    navigation.navigate("Tasks")
                }
                } title="Manage recived tasks" />
            </View>

        </View>
    );
};
export default Home;