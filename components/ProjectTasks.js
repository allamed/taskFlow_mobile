import {View, Text, ScrollView} from "react-native";
import UserAvatar from "./ui/UserAvatar";
import React from "react";
import {Avatar} from "@rneui/themed";
import {stringToColor} from "../utils/utilsFunctions";
const taskStatus=(status)=>{
    //En_ATTENTE, EN_COURS, ATTENTE_VALIDATION,VALIDEE
    switch (status) {
        case null:
            return {
                state :"not started",
                color:"red"
            }
        case "EN_ATTENTE":
            return {
                state :"to do",
                color:"red"
            };
        case "EN_COURS":
            return {
                state :"in progress",
                color:"orange"
            }
        case "ATTENTE_VALIDATION":
            return {
                state :"to validate",
                color:"blue"
            }
        case "VALIDEE":
            return {
                state :"done",
                color:"green"
            }
        default:
            return {
                state :"not started yet",
                color:"red"
            }

    }
}
const ProjectTasks = ({tasks}) => {
    return(
        <ScrollView style={{margin:20}}>
            <Text>Tasks :</Text>
            {tasks.map((task)=>(
                <View style={{}} key={task.id}>
                    <View style={{flexDirection:"column", alignItems:"center", margin:5}}>
                        <View style={{flexDirection:"row", alignItems:"center"}}>

                        <View style={{flex:1}}>
                            <Avatar
                                rounded
                                title={task.titre.charAt(0).toUpperCase()}
                                size={40}
                                containerStyle={{ backgroundColor: stringToColor(task.titre) }}
                            />
                        </View>
                        <View style={{flex:5, flexDirection:"column"}}>
                            <Text>{task.titre}</Text>
                            <Text style={{color:"grey", fontSize:12}}> {"assigned to "+ task.responsable.nom + " on " + task.deadLine }</Text>

                        </View>

                        <View style={{marginRight:10}}>
                            <Text style={{
                                color:taskStatus(task.status).color,
                                fontSize:12,
                            }}>
                            {taskStatus(task.status).state}
                            </Text>
                        </View>
                        </View>


                    </View>

                </View>
            ))}

        </ScrollView>

    );
}
export default ProjectTasks;