// function componenet for the current task screen

import React, { useState, useEffect, useContext } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, Modal, TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Icon} from "@rneui/themed";
import {updateTaskProgress, updateTaskState} from "../features/tasks/allTasksSlice";
import {useDispatch} from "react-redux";
import {Button, Input} from "@rneui/base";
import {TouchableRipple} from "react-native-paper";
import {GlobalStyles} from "../utils/globalStyles";


const CurrentTask = ({ route , currentTask}) => {
   // display the details of current task
    // const { currentTask } = route.params;
    const navigation = useNavigation();
    const [task, setTask] = useState(currentTask);
    const [taskStatus, setTaskStatus] = useState(currentTask.etat);
    const [taskStatusColor, setTaskStatusColor] = useState('#000000');
    const [taskStatusText, setTaskStatusText] = useState('Not Started');
    const [taskStatusButton, setTaskStatusButton] = useState('Start Task');
    const [taskStatusButtonColor, setTaskStatusButtonColor] = useState('#000000');
    const [taskStatusButtonTextColor, setTaskStatusButtonTextColor] = useState('#FFFFFF');

    const [progress, setProgress] = useState(task.avancement);

    const [modalVisible, setModalVisible] = useState(false);
    const [inputIsVisible, setInputIsVisible] = useState(false);

    const dispatch = useDispatch();




    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };


    useEffect(() => {
        // En_ATTENTE, EN_COURS, ATTENTE_VALIDATION,VALIDEE
        if (taskStatus === 'En_ATTENTE') {
            setTaskStatusColor('#000000');
            setTaskStatusText('Not Started');
            setTaskStatusButton('Start Task');
            setTaskStatusButtonColor('#000000');
            setTaskStatusButtonTextColor('#FFFFFF');
        } else if (taskStatus === 'EN_COURS') {
            setTaskStatusColor('#FFA500');
            setTaskStatusText('In Progress');
            setTaskStatusButton('Complete Task');
            setTaskStatusButtonColor('#000000');
            setTaskStatusButtonTextColor('#FFFFFF');
        } else if (taskStatus === 'ATTENTE_VALIDATION') {
            setTaskStatusColor('#008000');
            setTaskStatusText('Completed');
            setTaskStatusButton('Task Completed');
            setTaskStatusButtonColor('#FFFFFF');
            setTaskStatusButtonTextColor('#000000');
        }else if (taskStatus === 'VALIDEE') {
            setTaskStatusColor('#008000');
            setTaskStatusText('Validated');
            setTaskStatusButton('Task Validated');
            setTaskStatusButtonColor('#FFFFFF');
            setTaskStatusButtonTextColor('#000000');
        }

    }
    , [taskStatus]);

    const updateState = ( newState) => {
        const info = { idTache: task.id, nouveauEtat: newState };
        dispatch(updateTaskState(info));
    };

    const updateProgress = () => {
        const info = { taskId: task.id, newProgres: progress };
        dispatch(updateTaskProgress(info));
        setInputIsVisible(false);
    }

    const changeTaskStatus = () => {
        if (taskStatus === 'En_ATTENTE') {
            setTaskStatus('EN_COURS');
            updateState(2)
        } else if (taskStatus === 'EN_COURS') {
            setTaskStatus('ATTENTE_VALIDATION');
            updateState(3)
        } else if (taskStatus === 'ATTENTE_VALIDATION ') {
            setTaskStatus('ATTENTE_VALIDATION');
        }

    }

    const changeProgress = (newProgress) => {
        // check if new progress is a number
        if (isNaN(newProgress)) {
            return;
        }

        //ensure new progress is between 0 and 100 and is a number
        if (newProgress < 0) {
            newProgress = 0;
        } else if (newProgress > 100) {
            newProgress = 100;
        } else if (newProgress % 1 !== 0) {
            newProgress = Math.round(newProgress);
        }


        setProgress(newProgress);


    }
    const deleteTask = () => {
        Alert.alert(
            "Delete Task ",
            "Are you sure you want to delete this task?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },

                { text: "OK", onPress: () => navigation.navigate('Tasks') }
            ],
            { cancelable: false }
        );
    }


    return (
        <ScrollView style={styles.container}>


            {/*<View style={styles.taskDetails}>
                <View style={styles.taskDetailsRow}>
                    <View style={styles.taskDetailsLabelContainer}>
                     <Icon name="title" type="materiel" color="grey" size={30} />
                     <Text style={styles.taskDetailsLabel}>Title: </Text>
                    </View>
                    <Text style={styles.taskDetailsText}>{task.name}</Text>
                </View>
                <View style={styles.taskDetailsRow}>
                    <View style={styles.taskDetailsLabelContainer}>
                    <Icon name="description" type="materiel" color="grey" size={30} />
                    <Text style={styles.taskDetailsLabel}>Task Description: </Text>
                    </View>
                    <Text style={styles.taskDetailsText} numberOfLines={1}>{task.description}</Text>
                    {task.description.length > 40 && (
                        <>
                            <TouchableOpacity onPress={toggleModal}>
                                <Text style={styles.showMore}>{'Show More'}</Text>
                            </TouchableOpacity>

                        </>
                    )}
                </View>
                <View style={styles.taskDetailsRow}>
                    <View style={styles.taskDetailsLabelContainer}>
                    <Icon name='list-status' type='material-community' color="grey" size={30} />
                    <Text style={styles.taskDetailsLabel}>Task Status: </Text>
                    </View>
                    <Text style={[styles.taskDetailsText, { color: taskStatusColor }]}>{taskStatusText}</Text>
                </View>
                <View style={styles.taskDetailsRow}>
                    <View style={styles.taskDetailsLabelContainer}>
                        <Icon name='calendar-plus-o' type='font-awesome' color="grey" size={25} />
                        <Text style={styles.taskDetailsLabel}>Task Created Date: </Text>
                    </View>
                    <Text style={styles.taskDetailsText}>{task.debut}</Text>
                </View>
                <View style={styles.taskDetailsRow}>
                    <View style={styles.taskDetailsLabelContainer}>
                    <Icon name='calendar-check-o' type='font-awesome' color="grey" size={25} />
                    <Text style={styles.taskDetailsLabel}>Task Due Date: </Text>
                    </View>
                    <Text style={styles.taskDetailsText}>{task.deadLine}</Text>
                </View>

                <View style={styles.taskDetailsRow} >
                    <View style={styles.taskDetailsLabelContainer}>
                        <Icon name='progress-check' type='material-community' color="grey" size={30} />
                        <Text style={styles.taskDetailsLabel}> </Text>
                    </View>
                    {!inputIsVisible && (
                        <Text style={styles.taskDetailsText}>{progress} %</Text>
                    )}


                    {inputIsVisible && (
                    <View style={{ flexDirection:"row", height: "100%" }} >
                    <TextInput
                        style={styles.input}
                        onChangeText={changeProgress}
                        value={task.avancement}

                        keyboardType="numeric"
                    />
                        <Button title="Update" onPress={updateProgress} style={{alignItems:"center", paddingVertical:0}}> <Text style={{fontSize:11, paddingVertical:0, height:"100%", color:"white" }}>OK</Text> </Button>
                    </View>
                ) }
                </View>
            </View>*/}


            <View style={styles.menuWrapper}>
                <TouchableRipple onPress={() => {} } style={{ height:13}}>
                    <View style={{flex: 1, flexDirection:"row", backgroundColor:"#d1d8e0"}}>
                        <View style={{flex: (parseInt(progress) /100), backgroundColor:"#20bf6b"}}>

                        </View>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => {}}>
                    <View style={styles.menuItem}>
                        <Icon name="title" color={GlobalStyles.colors.primary600} size={25}/>
                        <Text style={styles.menuItemText}>{task.name}</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => {}} >
                    <View style={styles.menuItem}>
                        <Icon name="description" color={GlobalStyles.colors.primary600} size={25}/>
                        <Text style={styles.menuItemText}>{task.description}</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => {}} >
                    <View style={styles.menuItem}>
                        <Icon name='calendar-plus-o' type='font-awesome' color={GlobalStyles.colors.primary600} size={25}/>
                        <Text style={styles.menuItemText}> was assigned to you on {task.debut}</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => {}}  >
                    <View style={styles.menuItem}>
                        <Icon name='list-status' type='material-community' color={GlobalStyles.colors.primary600} size={25}/>
                        <Text style= {[styles.menuItemText, { color: taskStatusColor }]}  >{taskStatusText}</Text>
                    </View>
                </TouchableRipple>

                <TouchableRipple onPress={() => {}} style={{backgroundColor:"#ffda79"}}>
                    <View style={styles.menuItem}>
                        <Icon name='calendar-check-o' type='font-awesome' color={GlobalStyles.colors.primary600} size={25}/>
                        <Text style={styles.menuItemText}> deadline : {task.deadLine}</Text>
                    </View>
                </TouchableRipple>

                <TouchableRipple onPress={() => {}}>
                    <View style={styles.menuItem}>
                        <Icon name='progress-check' type='material-community' color={GlobalStyles.colors.primary600} size={25}/>
                        <Text style={styles.menuItemText}>{progress} %</Text>
                    </View>
                </TouchableRipple>
                <Input
                    backgroundColor={"#dff9fb"}
                    style={{borderBottomWidth:0, borderRadius:10, margin:5, backgroundColor:"#dff9fb"}}
                    placeholder='INPUT WITH CUSTOM ICON'
                    value={'  ' }

                    leftIcon={
                        <Icon
                            name='calendar-plus-o'
                            type='font-awesome'
                            size={24}
                            color={GlobalStyles.colors.primary600}
                        />
                    }
                />

            </View>


            <View style={styles.taskButtons}>
                <TouchableOpacity style={[styles.taskButton, { backgroundColor: taskStatusButtonColor }]} onPress={changeTaskStatus}>
                    <Text style={[styles.taskButtonText, { color: taskStatusButtonTextColor }]}>{taskStatusButton}</Text>
                </TouchableOpacity>
                {
taskStatus === 'EN_COURS' && (
                        <TouchableOpacity style={[styles.taskButton, { backgroundColor: taskStatusButtonColor }]} onPress={()=>{
                            setInputIsVisible(!inputIsVisible)} }>
                            <Text style={[styles.taskButtonText, { color: taskStatusButtonTextColor }]}>Update progress</Text>
                        </TouchableOpacity>)
                }

               {/* <TouchableOpacity style={[styles.taskButton, { backgroundColor: '#FF0000' }]} onPress={deleteTask}>
                    <Text style={[styles.taskButtonText, { color: '#FFFFFF' }]}>Delete Task</Text>
                </TouchableOpacity>*/}
            </View>
            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>

                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalHeaderText}>Task Description</Text>
                        </View>
                        <Text style={styles.modalText}>{task.description}</Text>
                        <TouchableOpacity onPress={toggleModal}>
                            <Text style={styles.modalClose}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={{height:300}}>

            </View>
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    container: {

        backgroundColor: '#FFFFFF',
        flex: 1,
        flexWrap: 'wrap',


    },
    header: {
        width: '100%',
        height: 50,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',

    },
    headerText: {
        color: '#FFFFFF',
        fontSize: 20,
    },
    taskDetails: {
        width: '100%',
        marginTop: 10,
      height: 400,
        backgroundColor: '#FFFFFF',
alignItems: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: 25,
        paddingTop: 10,
        paddingBottom: 10,


    },
    taskDetailsRow: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        height: 100,
        marginVertical: 10,

        // ensure the entire text is shown when it has multiple lines



    },
    taskDetailsLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 15,

    },
    taskDetailsLabel: {
        fontSize: 15,
        color: 'grey',


    },
    taskDetailsText: {
        fontSize: 16,
        height: 70,
        paddingHorizontal: 15,
        alignItems: 'center',
        //ensure the entire text is shown when it has multiple lines


    },
    showMore: {
        color: '#0000FF',
        fontSize: 13,
        fontWeight: 'bold',
        marginTop: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 25,
       marginHorizontal: 10,
        borderWidth: 0.5,
        padding: 5,
        width: 50,
        borderRadius: 5,
        borderColor: 'grey',
        fontSize: 15,
        color: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',

    },
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

    taskButtons: {

        width: '100%',

        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    taskButton: {
        width: 160,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 10,
    },
    taskButtonText: {
        fontSize: 15,

    },
    taskButtonDelete: {
        width: 160,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 10,
        backgroundColor: '#c95f5f',
    },
    taskButtonTextDelete: {
        fontSize: 20,
        color: '#FFFFFF',
    },
    taskButtonComplete: {
        width: 200,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 10,
        backgroundColor: '#008000',
    },
    taskButtonTextComplete: {
        fontSize: 20,
        color: '#FFFFFF',
    },
    taskButtonStart: {
        width: 200,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 10,
        backgroundColor: '#000000',
    },
    taskButtonTextStart: {
        fontSize: 20,
        color: '#FFFFFF',
    },
    taskButtonInProgress: {
        width: 200,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 10,
        backgroundColor: '#FFA500',
    },
    taskButtonTextInProgress: {
        fontSize: 20,
        color: '#FFFFFF',
    },
    taskButtonCompleteTask: {
        width: 200,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 10,
        backgroundColor: '#000000',
    },
    taskButtonTextCompleteTask: {
        fontSize: 20,
        color: '#FFFFFF',
    },
    taskButtonValidateTask: {
        width: 200,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 10,
        backgroundColor: '#000000',
    },
    taskButtonTextValidateTask: {
        fontSize: 20,
        color: '#FFFFFF',
    },
    taskButtonCancelTask: {
        width: 200,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 10,
        backgroundColor: '#FF0000',
    },
    taskButtonTextCancelTask: {
        fontSize: 20,
        color: '#FFFFFF',
    },
    taskButtonReopenTask: {
        width: 200,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 10,
        backgroundColor: '#FF0000',
    },
    taskButtonTextReopenTask: {
        fontSize: 20,
        color: '#FFFFFF',
    }
    ,
    menuWrapper: {
    marginTop: 5,
},
menuItem: {
    flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
},
menuItemText: {
    color: '#535c68',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
},






});



export default CurrentTask;