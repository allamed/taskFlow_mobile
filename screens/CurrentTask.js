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
    const [progressUpdated, setProgressUpdated] = useState(false);

    const [progress, setProgress] = useState(currentTask.avancement);
    // convert from percentage to an integer between 0 and 6
    const percentageToInteger = (percentage) => {
        if (percentage === 0) {
            return 0;
        } else if (percentage > 0 && percentage < 20) {
            return 1;
        } else if (percentage >= 20 && percentage < 40) {
            return 2;
        } else if (percentage >= 40 && percentage < 60) {
            return 3;
        } else if (percentage >= 60 && percentage < 80) {
            return 4;
        } else if (percentage >= 80 && percentage < 100) {
            return 5;
        } else if (percentage === 100) {
            return 6;
        }
    }
    // convert from an integer between 0 and 6 to a percentage
    const integerToPercentage = (integer) => {
        if (integer === 0) {
            return 0;
        } else if (integer === 1) {
            return 10;
        } else if (integer === 2) {
            return 30;
        } else if (integer === 3) {
            return 50;
        } else if (integer === 4) {
            return 70;
        } else if (integer === 5) {
            return 90;
        } else if (integer === 6) {
            return 100;
        }
    }
    const [graphicProgress, setGraphicProgress] = useState(percentageToInteger(currentTask.avancement));

    const [modalVisible, setModalVisible] = useState(false);
    const [inputIsVisible, setInputIsVisible] = useState(false);

    const dispatch = useDispatch();







    useEffect(() => {
        // En_ATTENTE, EN_COURS, ATTENTE_VALIDATION,VALIDEE
        if (taskStatus === 'EN_ATTENTE') {
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

        if ( progress>0 && progress<100){
            setTaskStatus('EN_COURS');
            updateState(2);
        }
        else if ( progress===100){
            setTaskStatus('ATTENTE_VALIDATION');
            updateState(3);
        }

        else if (progress===0){
            setTaskStatus('EN_ATTENTE');
            updateState(1);
        }
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
    const arr=[1,2,3,4,5,6];


    return (
        <ScrollView >
            <View style={styles.container}>



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
                <View style={{flex:1, flexDirection:"row", margin: 5}}>
                {arr.map(
                    (item, index) => {
                        return(
                            <TouchableRipple onPress={() => {
                                if (graphicProgress == index+1){
                                    setGraphicProgress(index);
                                    setProgress(integerToPercentage(index));
                                }
                                else {

                                setGraphicProgress(index+1);
                                setProgress(integerToPercentage(index+1));
                                }
                                setProgressUpdated(true)
                            }} style={{margin:4,flex:1,
                                backgroundColor: (index+1) <= graphicProgress ? "#20bf6b" : "#d1d8e0",
                                height:15, borderRadius:3}}>
                            <View >
                            </View>
                            </TouchableRipple>

                )} )
                    }
                    </View>



            </View>


            <View style={styles.taskButtons}>
                <Button style={{backgroundColor:"#ffda79" ,margin:5}}
                        disabled={(taskStatus == 'Completed' || !progressUpdated) }

                                  onPress={()=>{
                                        updateProgress();
                                        setProgressUpdated(false);


                                  } }>

                        Update progress

                </Button>






               {/* <TouchableOpacity style={[styles.taskButton, { backgroundColor: '#FF0000' }]} onPress={deleteTask}>
                    <Text style={[styles.taskButtonText, { color: '#FFFFFF' }]}>Delete Task</Text>
                </TouchableOpacity>*/}
            </View>

            <View style={{height:100}}>

            </View>
        </View>
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    container: {

        backgroundColor: '#FFFFFF',

        flexWrap: 'wrap',
        flexDirection: 'column',


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
        height: 100,flex:1,
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