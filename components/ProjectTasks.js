import {View, Text, ScrollView, Pressable, Modal, TextInput, StyleSheet, TouchableOpacity} from "react-native";
import UserAvatar from "./ui/UserAvatar";
import React, {useState} from "react";
import {Avatar} from "@rneui/themed";
import {stringToColor} from "../utils/utilsFunctions";
import CurrentTask from "../screens/CurrentTask";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Button} from "@rneui/base";
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
    const [currentTask, setCurrentTask] = useState('initial value');
    const Stack = createNativeStackNavigator();
    const AllProjectTasks = ({tasks}) => {
        const [newTaskModalVisible, setNewTaskModalVisible] = useState(false);
        return(
            <ScrollView style={{marginVertical:5}}>

                {tasks.map((task)=>(
                    <Pressable style={{ borderBottomColor: "grey", borderBottomWidth:0.5, padding:5}} key={task.id}
                               onPress={
                                   ()=>{
                                       console.log("task pressed");
                                   }
                               }
                    >
                        <View style={{flexDirection:"column", alignItems:"center", marginVertical:10, marginHorizontal:10}}>
                            <View style={{flexDirection:"row", alignItems:"center"}}>

                                <View style={{flex:1, }}>
                                    <Avatar
                                        rounded
                                        title={task.titre.charAt(0).toUpperCase()}
                                        size={40}
                                        containerStyle={{ backgroundColor: stringToColor(task.titre) }}
                                    />
                                </View>
                                <View style={{flex:5, flexDirection:"column", marginLeft:15}}>
                                    <Text style={{marginLfet:5}}>{task.titre}</Text>
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

                    </Pressable>
                ))}
                <View style={{margin:25}}>
                    <Button title={"add new task"} onPress={()=>
                    setNewTaskModalVisible(true)
                    }/>

                </View>
                <Modal
                    style={styles.modalContainer}
                visible={newTaskModalVisible}
                animationType="slide"
                transparent={true}
                >
                    <View style={styles.modalContainer}>

                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalHeaderText}>Task Description</Text>
                            </View>
                            <Text style={styles.modalText}>some text</Text>
                            <TouchableOpacity onPress={()=>setNewTaskModalVisible(false)}>
                                <Text style={styles.modalClose}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>


            </ScrollView>

        );
    }

    const ProjectCurrentTask = ({currentTask}) => {
        return(
            <View>
                <Text > project task details </Text>
            </View>
        );
    }
return(
    <Stack.Navigator
  headerShown={false}
    >
        <Stack.Screen name="AllProjectTasks"
         headerShown={false}
        >
            {props => <AllProjectTasks {...props} setCurrentTask={setCurrentTask}  tasks={tasks}/>}
        </Stack.Screen>
        <Stack.Screen name="Project Task details"  headerShown={false}>
            {props => <ProjectCurrentTask {...props} currentTask={currentTask} />}
        </Stack.Screen>
    </Stack.Navigator>);



}
export default ProjectTasks;
const styles = StyleSheet.create( {
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000080',
    },
    modalHeader: {
        width: '100%',
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#000000',
        paddingVertical: 10,



    },
    modalContent: {
        width: '80%',
        height: '50%',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalText: {
        fontSize: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        textAlign: 'center',
    },
    modalClose: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0000FF',
        marginTop: 10,

    },
}
);
