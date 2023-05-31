import {View, Text, Pressable, Modal, TouchableOpacity, Button, ScrollView, Alert} from "react-native";
import {Avatar, Input} from "@rneui/base";
import userIcon from "../assets/usericon.png"
import {Icon} from "@rneui/themed";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {addMemberToProject} from "../features/currentProject/currentProjectSlice";

const ProjectMembers = ({members, projectId}) => {
    const [addMemberModalVisible, setAddMemberModalVisible]=useState(false);
    const [newMemberEmail, setNewMemberEmail]=useState("")
    const dispatch = useDispatch();

    const addMember=()=>{
        // dispatch add member action
        if (members.find((x) => x.email == newMemberEmail) != null) {
            Alert.alert('Alert ', 'this user is already a member of this project');
            setAddMemberModalVisible(false);
            setNewMemberEmail("");
            return;

        }
        const data = { email:newMemberEmail, id: projectId };
        dispatch(addMemberToProject(data));
        setNewMemberEmail("");
        setAddMemberModalVisible(false);


    }
    



    return(
        <View style={{marginVertical:10}}>
            <Text style={{marginVertical:10, fontSize:20, alignSelf:"center"}}>Members </Text>
            {members.map((member)=>{
                return (
                    <View style={{}}>
                        <View style={{flexDirection:"row", alignItems:"center", margin:5}}>
                            <View style={{flex:1}}>
                                <Avatar
                                    rounded
                                    source={userIcon}
                                    size={40}
                                    color="grey"
                                />
                            </View>
                        <View style={{flex:5, flexDirection:"column"}}>
                            <Text>{member.nom}</Text>
                            <Text style={{color:"grey"}}>{member.email}</Text>

                        </View>


                        </View>

                    </View>

    );
            }



            )}
            {!addMemberModalVisible && <Pressable onPress={()=>setAddMemberModalVisible(true)}>
                 <View style={{}}>
                    <View style={{flexDirection:"row", alignItems:"center", margin:5}}>
                        <View style={{flex:1}}>
                            <Icon
                                name='add'

                                size={29}
                                color='blue'
                            />
                        </View>
                        <View style={{flex:8, flexDirection:"column"}}>
                            <Text style={{color:"blue"}}>  new member</Text>


                        </View>


                    </View>

                </View>
            </Pressable>}
            {
                addMemberModalVisible &&
                <View style={{}}>
                    <View style={{flexDirection:"row", alignItems:"center", margin:5}}>

                        <View style={{width:250, flexDirection:"row", alignItems:"center"}}>
                            <Input
                                placeholder=' enter email of new user'
                                value={newMemberEmail}
                                onChangeText={(newEmail)=>setNewMemberEmail(newEmail)}
                                leftIcon={
                                    <Icon
                                        name='mail'
                                        size={24}
                                        color='grey'
                                    />
                                }
                            />
                            <View style={{height:40}}>
                                <Button  title="add" onPress={addMember}/>
                            </View>
                            <View style={{height:40, marginLeft:5}}>
                                <Button  title="cancel" color="grey" />
                            </View>





                        </View>


                    </View>

                </View>
            }



        </View>

    );
}
export default ProjectMembers;