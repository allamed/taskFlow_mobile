// function componenet for the current task screen

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Icon} from "@rneui/themed";


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
        } else if (taskStatus === 'VALIDEE') {
            setTaskStatusColor('#008000');
            setTaskStatusText('Completed');
            setTaskStatusButton('Task Completed');
            setTaskStatusButtonColor('#FFFFFF');
            setTaskStatusButtonTextColor('#000000');
        }

    }
    , [taskStatus]);

    const changeTaskStatus = () => {
        if (taskStatus === 'En_ATTENTE') {
            setTaskStatus('EN_COURS');
        } else if (taskStatus === 'EN_COURS') {
            setTaskStatus('VALIDEE');
        } else if (taskStatus === 'VALIDEE ') {
            setTaskStatus('VALIDEE');
        }

    }
    const deleteTask = () => {
        Alert.alert(
            "Delete Task",
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
        <View style={styles.container}>
            {/*<View style={styles.header}>
                <Text style={styles.headerText}>Task Details</Text>
            </View>*/}
            <View style={styles.taskDetails}>
                <View style={styles.taskDetailsRow}>
                    <View style={styles.taskDetailsLabelContainer}>
                     <Icon name="title" type="materiel" color="grey" size={30} />
                     {/*<Text style={styles.taskDetailsLabel}>Title: </Text>*/}
                    </View>
                    <Text style={styles.taskDetailsText}>{task.name}</Text>
                </View>
                <View style={styles.taskDetailsRow}>
                    <View style={styles.taskDetailsLabelContainer}>
                    <Icon name="description" type="materiel" color="grey" size={30} />
                    {/*<Text style={styles.taskDetailsLabel}>Task Description: </Text>*/}
                    </View>
                    <Text style={styles.taskDetailsText}>{task.description}</Text>
                </View>
                <View style={styles.taskDetailsRow}>
                    <View style={styles.taskDetailsLabelContainer}>
                    <Icon name='list-status' type='material-community' color="grey" size={30} />
                    {/*<Text style={styles.taskDetailsLabel}>Task Status: </Text>*/}
                    </View>
                    <Text style={[styles.taskDetailsText, { color: taskStatusColor }]}>{taskStatusText}</Text>
                </View>
                <View style={styles.taskDetailsRow}>
                    <View style={styles.taskDetailsLabelContainer}>
                        <Icon name='calendar-plus-o' type='font-awesome' color="grey" size={25} />
                        {/*<Text style={styles.taskDetailsLabel}>Task Created Date: </Text>*/}
                    </View>
                    <Text style={styles.taskDetailsText}>{task.debut}</Text>
                </View>
                <View style={styles.taskDetailsRow}>
                    <View style={styles.taskDetailsLabelContainer}>
                    <Icon name='calendar-check-o' type='font-awesome' color="grey" size={25} />
                    {/*<Text style={styles.taskDetailsLabel}>Task Due Date: </Text>*/}
                    </View>
                    <Text style={styles.taskDetailsText}>{task.deadLine}</Text>
                </View>

                <View style={styles.taskDetailsRow}>
                    <View style={styles.taskDetailsLabelContainer}>
                        <Icon name='progress-check' type='material-community' color="grey" size={30} />
                        <Text style={styles.taskDetailsLabel}> </Text>
                    </View>
                    <Text style={styles.taskDetailsText}>{task.avancement} %</Text>
                </View>
            </View>
            <View style={styles.taskButtons}>
                <TouchableOpacity style={[styles.taskButton, { backgroundColor: taskStatusButtonColor }]} onPress={changeTaskStatus}>
                    <Text style={[styles.taskButtonText, { color: taskStatusButtonTextColor }]}>{taskStatusButton}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.taskButton, { backgroundColor: '#FF0000' }]} onPress={deleteTask}>
                    <Text style={[styles.taskButtonText, { color: '#FFFFFF' }]}>Delete Task</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',

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
        height: 300,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 25,
        paddingTop: 10,
    },
    taskDetailsRow: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
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
    },
    taskButtons: {
        width: '100%',
        height: 100,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    taskButton: {
        width: 200,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 10,
    },
    taskButtonText: {
        fontSize: 20,

    },
    taskButtonDelete: {
        width: 200,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 10,
        backgroundColor: '#FF0000',
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
    },






});



export default CurrentTask;