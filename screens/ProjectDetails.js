// function component
import {View, Text, StyleSheet, Button, ScrollView} from "react-native";
import project from "../components/Project";
import ProjectMembers from "../components/ProjectMembers";
import ProjectTasks from "../components/ProjectTasks";
import {useEffect, useState} from "react";
import {urlBase} from "../utils/axios";
import { Input} from "@rneui/base";
import {Icon} from "@rneui/themed";
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';


const distinct = (arr) => {
    return arr.filter( (item, index) =>arr.findIndex((i) => i.id === item.id) === index
    );
}

const ProjectDetails = ({ route, navigation,currentProject  }) => {
    useEffect(() => {

        getTasksByProject(currentProject.id);

    }, []);

    const [date, setDate] = useState(new Date(1598051730000));

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
        });
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const [tasks, setTasks] = useState([]);
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
    console.log(currentProject.membres);
    const members = currentProject.membres.filter(
        (item, index) => currentProject.membres.findIndex((i) => i.id === item.id) === index
    );;
    return(

        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerLabel}>Project Name :</Text>
                <Input
                    placeholder='INPUT WITH CUSTOM ICON'
                    value={currentProject.nom}
                    leftIcon={
                        <Icon
                            name='title'
                            size={24}
                            color='grey'
                        />
                    }
                        />

                <Text style={styles.headerLabel}>Project start Date :</Text>
                <Input
                    placeholder='INPUT WITH CUSTOM ICON'
                    value={'  ' + currentProject.debut}
                    leftIcon={
                        <Icon
                            name='calendar-plus-o'
                            type='font-awesome'
                            size={24}
                            color='grey'
                        />
                    }
                />
                <Button onPress={showDatepicker} title="Show date picker!" />

            </View>





            <ProjectMembers members={members} projectId={currentProject.id}/>
            <ProjectTasks tasks={tasks}/>


        </ScrollView>

    );


}
export default ProjectDetails;
const styles=StyleSheet.create({


    container:{
        flex:1,
        padding:20,
        backgroundColor:"#fff",
    },
    header:{
        flexDirection:"column",
        justifyContent:"space-between",
        
        marginBottom:20,
    },
    headerLabel:{
        fontSize:16,
        fontWeight:"bold",
        color:"#333",
    },
    headerText:{
        fontSize:16,
        fontWeight:"bold",
        color:"red",

    }
});