import {
    View,
    Text,
    ScrollView,
    Pressable,
    Modal,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Platform
} from "react-native";
import UserAvatar from "./ui/UserAvatar";
import React, {useEffect, useState} from "react";
import {Avatar, Icon} from "@rneui/themed";
import {stringToColor} from "../utils/utilsFunctions";
import CurrentTask from "../screens/CurrentTask";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Button, Input} from "@rneui/base";
import {GlobalStyles} from "../utils/globalStyles";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker, {DateTimePickerAndroid} from "@react-native-community/datetimepicker";
import {TouchableRipple} from "react-native-paper";
import {createTask} from "../features/project/projectSlice";
import {useDispatch} from "react-redux";
import {urlBase} from "../utils/axios";
import TaskDetails from "../screens/TaskDetails";

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

const ProjectTasks = ({ members,  projectId}) => {
    const [taskAdded, setTaskAdded] = useState(0);

    useEffect(() => {

        getTasksByProject(projectId);

    }, [taskAdded]);
    const [tasks, setTasks] = useState([]);

    const [currentTask, setCurrentTask] = useState('initial value');
    const Stack = createNativeStackNavigator();
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const getTasksByProject = async (projectId) =>
        await fetch(`${urlBase}/projets/${projectId}/tasks`).then(
            async (response) => {
                if (response.ok) {
                    const data = await response.json();
                    setTasks(data.taches);
                } else console.log(response);
                return;
            }
        );


    const AllProjectTasks = ({tasks, navigation}) => {
        const [open, setOpen] = useState(false);
        const [newTaskResponsible, setNewTaskResponsible] = useState({});
        const [items, setItems] = useState(members.map((member)=>({
            label: member.nom,
            value: member.id,
        })));

        const [newTaskModalVisible, setNewTaskModalVisible] = useState(false);
        const [newTaskDeadLine, setNewTaskDeadLine] = useState(new Date());
        const [newTaskTitle, setNewTaskTitle] = useState("");

        const [mode, setMode] = useState('date');
        const [show, setShow] = useState(false);

        const onChange = (event, selectedDate) => {
            const currentDate = selectedDate || date;
            setShow(Platform.OS === 'ios');
            setNewTaskDeadLine(currentDate);
        };

        const showMode = (currentMode) => {
            setShow(true);
            setMode(currentMode);
        };

        const showDatepicker = () => {
            showMode('date');
        };
        let tempTaskTitle = "";

        const createNewTask = () => {
            console.log("creating new task");
            console.log(newTaskResponsible);
            let newTask = {
                title: newTaskTitle,
                deadline: newTaskDeadLine,
                responsableId: newTaskResponsible,
                projectId: projectId,
            }
            console.log(newTask);
            dispatch(createTask(newTask));
            setTaskAdded(taskAdded+1);
            setNewTaskModalVisible(false);

        }

        return(
            <ScrollView style={{marginVertical:5}}>
                <View style={{marginHorizontal:35, marginTop:10}}>
                    <Button title={"+ add new task"} onPress={()=>
                        setNewTaskModalVisible(true)
                    }/>

                </View>

                {tasks.map((task)=>(
                    <TouchableRipple style={{ borderBottomColor: "grey", borderBottomWidth:0.5, padding:5}} key={task.id}
                               onPress={
                                   ()=>{
                                       console.log("task pressed");
                                       setCurrentTask(task);
                                       navigation.navigate('Task details');
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
                                        color:taskStatus(task.etat).color,
                                        fontSize:12,
                                    }}>
                                        {taskStatus(task.etat).state}
                                    </Text>
                                </View>
                            </View>


                        </View>

                    </TouchableRipple>
                ))}

                <Modal
                    style={styles.modalContainer}
                visible={newTaskModalVisible}
                animationType="slide"
                transparent={true}
                >
                    <View style={styles.modalContainer}>

                        <View style={styles.modalContent}>

                            <Text style={styles.modalText}>New task</Text>

                            <View style={{marginHorizontal:10}}>


                            <Text style={{fontWeight:"bold", color:"gray", fontStyle:"italic", fontSize:12, marginLeft:15}}>Task title</Text>
                            <Input
                                backgroundColor={"white"}
                                style={{borderWidth:0.5, borderRadius:10, margin:5, borderColor:"gray", padding:10, fontSize:15}}
                                placeholder='enter task title'
                                defaultValue={newTaskTitle}

                                onChangeText={(text)=>
                                    tempTaskTitle=text
                            }
                                onEndEditing={()=>{
                                    setNewTaskTitle(tempTaskTitle);
                                    console.log("new task title : "+ newTaskTitle);
                                }
                                }

                            />
                            </View>
                            <View style={{marginHorizontal:25,


                            zIndex:5000}}>
                                <Text style={{fontWeight:"bold", color:"gray", fontStyle:"italic", fontSize:12, marginBottom:3}}>Assigned to </Text>



                                <DropDownPicker
                                style={{borderWidth:0.5, borderRadius:10,  borderColor:"gray", height:50}}
                                placeholder="Select a member"







                                open={open}
                                value={newTaskResponsible}
                                items={items}
                                setOpen={setOpen}
                                setValue={setNewTaskResponsible}
                                setItems={setItems}
                                mode={"BADGE"}
                                theme={"LIGHT"}
                                zIndex={5000}


                            />
                            </View>
                            <View style={{ marginVertical:15,marginHorizontal:10, height:45, alignContent:"center"}}>
                                <Text style={{marginLeft: 12, fontWeight:"bold", color:"gray", fontStyle:"italic", fontSize:12, marginBottom:3}}>DeadLine </Text>

                                {Platform.OS !== 'ios' &&  <Pressable onPress={
                                    showDatepicker
                                }>
                                    <Input
                                        backgroundColor={"white"}
                                        style={{
                                            borderWidth: 0.5,
                                            borderRadius: 10,
                                            margin: 5,
                                            borderColor: "gray",
                                            padding: 10,
                                            fontSize: 15,
                                        }}
                                        placeholder='DeadLine'
                                        value={newTaskDeadLine.toString().slice(0, 16)}

                                        editable={false}

                                    />
                                </Pressable>}
                                {
                                    show && (
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            value={newTaskDeadLine}
                                            mode={mode}
                                            is24Hour={true}
                                            display="default"
                                            onChange={onChange}
                                        />
                                    )
                                }



                            </View>
                            <View style={{ flexDirection:"row", alignContent:"center", marginTop:35}}>

                            <View style={{flex:1, marginHorizontal:15,}}>
                            <Button  onPress={createNewTask}
                            disabled={!newTaskTitle || !newTaskResponsible || !newTaskDeadLine}
                            >
                                Create task
                            </Button>

                            </View>
                            <View style={{flex:1, marginHorizontal:15}}>
                                <Button
                                    color="#ea8685"
                                    onPress={()=>setNewTaskModalVisible(false)}>
                                    Cancel
                                </Button>

                            </View>
                            </View>

                        </View>
                    </View>
                </Modal>


            </ScrollView>

        );
    }

    const ProjectCurrentTask = ({currentTask}) => {
        return(
           <TaskDetails currentTask={currentTask} />
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
        <Stack.Screen name="Task details"  headerShown={false}>
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
        width: '95%',
        height: '70%',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,

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
