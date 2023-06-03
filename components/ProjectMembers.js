import {View, Text, Pressable, Modal, TouchableOpacity, Button, ScrollView, Alert} from "react-native";
import {Avatar, Input} from "@rneui/base";
import userIcon from "../assets/usericon.png"
import {Icon} from "@rneui/themed";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addMemberToProject, getAllProjects, removeMemberFromProject} from "../features/project/projectSlice";
import UserAvatar from "./ui/UserAvatar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProjectMembers = ({ projectId, members}) => {

    const [projectMembers, setProjectMembers]=useState(members);
    const [addMemberModalVisible, setAddMemberModalVisible]=useState(false);
    const [newMemberEmail, setNewMemberEmail]=useState("")
    const [deleteIconVisible, setDeleteIconVisible]=useState(false);
    const [memberToDelete, setMemberToDelete]=useState(null);
    const dispatch = useDispatch();
    let email="";
    let id=0;
    const fetchUser = async () => {
        id = await AsyncStorage.getItem('userId');
        email = await AsyncStorage.getItem('email');



    }
    useEffect(
        () => {
            fetchUser();
        }, []
    )
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
        setProjectMembers([...projectMembers, {email:newMemberEmail, id:0, nom:""}]);


    }
    const deleteMember=()=>{
        // dispatch delete member action
        Alert.alert(
            "Delete member",
            "Are you sure you want to delete " + memberToDelete.nom + " from this project ?",
            [
                {
                    text: "Cancel",
                    onPress: () => {
                        setDeleteIconVisible(false);
                        setMemberToDelete(null);
                    },
                    style: "cancel"
                },
                { text: "OK", onPress: () => {
                        // dispatch delete member action
                        console.log ("member to delete : " + memberToDelete.email + " from project : " + projectId);
                        const data = { email:memberToDelete.email, id: projectId };
                        dispatch(removeMemberFromProject(data));
                        setProjectMembers(projectMembers.filter((x) => x.email != memberToDelete.email)
                        );

                    } }
            ]
        );

        setDeleteIconVisible(false);
        setMemberToDelete(null);
    }
    



    return(
        <ScrollView style={{margin:25}} contentContainerStyle={{alignContent:"center", flex:1}}>

            {projectMembers.map((member)=>{
                return (
                    <Pressable style={{}} key={member.id} onLongPress={
                        ()=>{
                            setDeleteIconVisible(true);
                            setMemberToDelete(member);
                        }
                    }
                    delayLongPress={1000}
                    >
                        <View style={{flexDirection:"row", alignItems:"center", margin:5}}>
                            <View style={{flex:1}}>
                                <UserAvatar id={member.id} nom={member.nom}/>
                            </View>
                        <View style={{flex:5, flexDirection:"column"}}>
                            <Text>{member.nom}</Text>
                            <Text style={{color:"grey"}}>{member.email}</Text>

                        </View>
                            <View style={{flex:1}}>
                                {deleteIconVisible &&<Pressable onPress={deleteMember}>
                                    <Icon
                                        name='close'

                                        size={22}
                                        color='#eb4d4b'
                                    />
                                </Pressable>}
                            </View>


                        </View>

                    </Pressable>

    );
            }



            )}
            {/*{!addMemberModalVisible && <Pressable onPress={()=>setAddMemberModalVisible(true)}>
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
            </Pressable>}*/}
            <View style={{marginVertical:20, marginHorizontal:15}}>
                <View>
                    <Button disabled={addMemberModalVisible}  title={"+ add member"} onPress={()=>setAddMemberModalVisible(true)}/>
                </View>
                <View style={{marginVertical:10}}>
                    <Button  disabled={addMemberModalVisible}  title={"- remove member"} color="#eb4d4b" onPress={()=>setAddMemberModalVisible(true)}/>
                </View>
            </View>
            {
                addMemberModalVisible &&
                <View style={{backgroundColor:"white", paddingBottom:10}}>
                    <View style={{flexDirection:"row", alignItems:"center", margin:5}}>

                        <View style={{flex:1, flexDirection:"column", alignItems:"center"}}>
                            <Input
                                backgroundColor={"white"}
                                style={{borderBottomWidth:0, borderRadius:10, margin:10, padding:10}}
                                placeholder=' enter email of new user'
                                value={newMemberEmail}
                                onChangeText={(newEmail)=>setNewMemberEmail(newEmail)}
                                leftIcon={
                                    <Icon
                                        name='mail'
                                        size={22}
                                        color='grey'
                                    />
                                }
                            />
                            <View style={{flexDirection:"row" }}>
                                <View style={{flex:1, marginHorizontal:20}}>
                                <Button  title="add" onPress={addMember} />
                                </View>
                                <View style={{flex:1, marginHorizontal:20}}>
                                <Button  title="cancel"  color="grey" onPress={()=>{
                                    setAddMemberModalVisible(false)
                                setNewMemberEmail("")}} />
                            </View>
                            </View>






                        </View>


                    </View>

                </View>
            }



        </ScrollView>

    );
}
export default ProjectMembers;