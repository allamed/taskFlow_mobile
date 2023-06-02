import {View, Text, Pressable, Modal, TouchableOpacity, Button, ScrollView, Alert} from "react-native";
import {Avatar, Input} from "@rneui/base";
import userIcon from "../assets/usericon.png"
import {Icon} from "@rneui/themed";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {addMemberToProject, removeMemberFromProject} from "../features/currentProject/currentProjectSlice";
import UserAvatar from "./ui/UserAvatar";

const ProjectMembers = ({members, projectId}) => {
    const [addMemberModalVisible, setAddMemberModalVisible]=useState(false);
    const [newMemberEmail, setNewMemberEmail]=useState("")
    const [deleteIconVisible, setDeleteIconVisible]=useState(false);
    const [memberToDelete, setMemberToDelete]=useState(null);
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
                        dispatch(removeMemberFromProject({
                            id: projectId,
                            email: memberToDelete.email
                        }));

                        console.log("delete member");
                    } }
            ]
        );

        setDeleteIconVisible(false);
        setMemberToDelete(null);
    }
    



    return(
        <ScrollView style={{margin:25}} contentContainerStyle={{alignContent:"center", flex:1}}>

            {members.map((member)=>{
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