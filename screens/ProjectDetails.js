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
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {useDispatch} from "react-redux";
import {updateProjectTitle} from "../features/project/projectSlice";
import {GlobalStyles} from "../utils/globalStyles";


const distinct = (arr) => {
    return arr.filter( (item, index) =>arr.findIndex((i) => i.id === item.id) === index
    );
}


const ProjectDetails = ({ route, navigation,currentProject  }) => {
    useEffect(() => {

        getTasksByProject(currentProject.id);

    }, []);
    const Tab = createMaterialTopTabNavigator();

    const [date, setDate] = useState(new Date(1598051730000));
    const [projectName, setProjectName] = useState(currentProject.nom);
    const [projectNameEdit, setProjectNameEdit] = useState(false);

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
    );
    const dispatch = useDispatch();
    let tempName = currentProject.nom;

    const ProjectInfo = () => {
        return (<View style={{margin:25, marginTop:30}}>
            <Input
                backgroundColor={"white"}
                style={{borderBottomWidth:0, borderRadius:10, margin:10, padding:10}}
                multiline={true}
                onChangeText={value => {
                    tempName = value;
                }
                }

                onBlur={e => {
                    setProjectName(tempName);
                    if (tempName !== currentProject.nom) {
                        setProjectNameEdit(true);
                    } else {
                        setProjectNameEdit(false);
                    }
                    }
                }
                defaultValue={"  "+ projectName}


                /*onEndEditing={() => {

                }}*/
                leftIcon={
                    <Icon
                        name='title'
                        size={24}
                        color={GlobalStyles.colors.primary600}
                    />
                }
            />

            <Text style={{fontWeight:"bold", color:"gray", fontStyle:"italic", fontSize:12}}>Project start Date :</Text>
            <Input
                backgroundColor={"white"}
                style={{borderBottomWidth:0, borderRadius:10, margin:5}}
                placeholder='INPUT WITH CUSTOM ICON'
                value={'  ' + currentProject.debut}
                onPressIn={showDatepicker}
                leftIcon={
                    <Icon
                        name='calendar-plus-o'
                        type='font-awesome'
                        size={24}
                        color={GlobalStyles.colors.primary600}
                    />
                }
            />
                <View style={{flexDirection:"column", justifyContent:"space-evenly", height: 100 }}>
            <Button title="Save" disabled={!projectNameEdit} onPress={() => {
                dispatch(updateProjectTitle({id: currentProject.id, newTitle: projectName}));
                setProjectNameEdit(false);
            }

            }
            />

            <Button  title="Delete project" color="#eb4d4b" onPress={() => {

            }}/>
                </View>

        </View>);
    }

    return(

        <Tab.Navigator>
            <Tab.Screen name="Project info" component={ProjectInfo}/>
            <Tab.Screen name="Project tasks">
                {() => <ProjectTasks tasks={tasks}/>}
            </Tab.Screen>
            <Tab.Screen name="Project members" >
                {() => <ProjectMembers members={members} projectId={currentProject.id}/>}
            </Tab.Screen>
        </Tab.Navigator>


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