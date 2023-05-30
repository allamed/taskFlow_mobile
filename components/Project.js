import {Pressable, Text, View, StyleSheet} from "react-native";
import {GlobalStyles} from "../utils/globalStyles";
import {useEffect, useState} from "react";
import {urlBase} from "../utils/axios";

function timePassed(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const differenceInMilliseconds = now - date;
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
    const differenceInDaysRounded = Math.floor(differenceInDays);
    return differenceInDaysRounded;
}
function Project({project}){
    useEffect(() => {

        getTasksByProject(project.id);

    }, []);
    const [tasks, setTasks] = useState([]);
    const colors = GlobalStyles.colors;
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

    return (
        <Pressable>
            <View style={styles.info}>

                <View style={{ flex: 1 }}>
                    <Text style={[styles.textBase, styles.description]}> {project.nom}</Text>
                    <Text style={styles.textBase}> {project.membres.length + " membres"} </Text>
                </View>
                <View style={styles.progressContainer}>
                    <Text style={styles.progress}> {`depuis ${timePassed(project.debut)} jours`}</Text>
                    <Text> {` ${tasks.length} taches`}</Text>
                </View>
            </View>
        </Pressable>
    );
}
export default Project;
const styles=StyleSheet.create({
    info:{
        padding:12,
        marginVertical:8,
        backgroundColor: GlobalStyles.colors.primary400,
        flexDirection:"row",
        justifyContent:"space-between",
        borderRadius:6,
        elecation:3,
        shadowColor:GlobalStyles.colors.gray500,
        shadowRadius:4,
        shadowOffset:{width:1, height:1},
        shadowOpacity:0.4
        // make space between elements



    },
    textBase:{
        color:GlobalStyles.colors.primary50
    },
    description:{
            fontSize:16,
            marginBottom: 4,
            fontWeight: 'bold',
            color:GlobalStyles.colors.primary50,
        marginHorizontal:4,

        },

    progressContainer:{
            paddingHorizontal:12,
        paddingVertical:4,
        backgroundColor:"white",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:4
    },
    progress:{
        color:GlobalStyles.colors.primary500,
        fontWeight:"bold"
    }

})