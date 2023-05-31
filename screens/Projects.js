import {Text, TouchableOpacity, StyleSheet, View, Modal, TextInput, FlatList, ScrollView} from "react-native";


import Project from "../components/Project";
import {Provider, useDispatch, useSelector} from "react-redux";
import {store} from "../store";
import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {createProject, getAllProjects} from "../features/project/projectSlice";
import CurrentTask from "./CurrentTask";
import ProjectDetails from "./ProjectDetails";
import {createStackNavigator} from "@react-navigation/stack";

const Projects=()=>{
    useEffect(() => {
        async function fetchUser() {
            const id = await AsyncStorage.getItem('userId');
            const email = await AsyncStorage.getItem('email');
            // convert to object format
            setUserEmail(email);
            setUserId(id);
            console.log(" userId", id);
            console.log("userEmail", email);
            // console.log(" tab b ", email);

        }

        fetchUser();


    }, []);

    const [userEmail, setUserEmail]=useState("");
    const [userId, setUserId]=useState("");
    const [currentProject, setCurrentProject]=useState(null);
    const Stack= createStackNavigator();
    const dispatch = useDispatch();
    dispatch(getAllProjects(userEmail));
    return (
        <Stack.Navigator>
            <Stack.Screen name="AllTasks" options={{headerShown: false}} >
                {props => <AllProjects {...props} userId={userId} userEmail={userEmail} setCurrentProject={setCurrentProject}/>}
            </Stack.Screen>
            <Stack.Screen name="Project details">
                {props => <ProjectDetails {...props} currentProject={currentProject} />}
            </Stack.Screen>
        </Stack.Navigator>

    );

}
const AllProjects=({userId, userEmail, setCurrentProject, navigation})=>{
    const dispatch=useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const [projectName, setProjectName] = useState("");

    const { projects } = useSelector(
        (store) => store.allProjects
    );

    const createNewProject=()=>{
        const newProject = {
            title: projectName,
            chefId: userId,
        };
        console.log("new project", newProject)
       dispatch (createProject(newProject));
        dispatch(getAllProjects(userEmail))
        setProjectName("");
        setModalVisible(false);
    }

    return(
        <View style={styles.container}>


            <View style={styles.projects}>
                <ScrollView>
                {/*<FlatList
                    data={projects}
                    renderItem={(project) =>  <Project key={project.id} project={project} />}
                    keyExtractor={project => project.id}
                />*/}
           { projects.map((project)=>{
            return (
                <Project key={project.id} project={project} setCurrentProject={setCurrentProject} navigation={navigation} />

           );
        })}
                </ScrollView>
            </View>
            <View style={styles.taskButtons}>


            <TouchableOpacity style={[styles.addProjectButton, { backgroundColor: "green" }]} onPress={()=>{
               setModalVisible(!modalVisible) } }>
                <Text style={[styles.taskButtonText, { color: "white" }]}>create new project</Text>
            </TouchableOpacity>
            </View>
            <View>
            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>

                    <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                        <Text style={styles.modalHeaderText}>Project name</Text>

                    <TextInput
                        style={styles.input}
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={(text) => setProjectName(text)}
                        value={projectName}/>
                    </View>
                        <TouchableOpacity onPress={createNewProject}>
                            <Text style={styles.modalClose}>Create</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            </View>



        </View>

    );
}
export default Projects;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",

        // justifyContent: "center",

    },
    projects: {
        flex: 3,
        backgroundColor: "#fff",
        margin: 10,


        // justifyContent: "center",

    },
    addProjectButton: {

        width: 160,
        height: 35,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,

    },
    taskButtonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    taskButtons: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',

    },
    modalContainer: {

        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000080',
    },
    input: {

        marginHorizontal: 10,
        borderWidth: 0.5,
        padding: 5,
        width:250,
        maxWidth: 200,
        borderRadius: 5,
        borderColor: 'grey',
        fontSize: 15,
        color: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        margin:10,

    },
    modalHeader: {
        width: '100%',
        flexDirection: 'column',
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',

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



});