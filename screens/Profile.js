import React, {useEffect, useState} from 'react';
import { View, Button, StyleSheet, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Title, Caption, Text, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch, useSelector} from "react-redux";
import {getUser, getUserParticipationProjects} from "../features/user/userSlice";
import {urlBase} from "../utils/axios";
import {getAllProjects} from "../features/project/projectSlice";
import {getAllTasks} from "../features/tasks/allTasksSlice";

export default function Profile() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUser());
    } , []);
    const {user}= useSelector((store) => store.user);
    return (
        <UserProfile user={user}/>
    );
}
const UserProfile = ({user}) => {

    const [url, setUrl] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {

      dispatch(getAllTasks(user.email));
      dispatch(getAllProjects(user.email));
      dispatch(getUserParticipationProjects(user.id));
        getUserImage(user.id);
    }
        , []);

    //console.log("projects" + userParticipationProjects);


    const { projects } = useSelector((store) => store.allProjects);
    const { tasks } = useSelector((store) => store.allTasks);
    const {userParticipationProjects } = useSelector(
        (store) => store.user
    );
    const validatedTasks = tasks.filter((card) => card.etat == "VALIDEE");


    console.log("user", user);



    function getUserImage(id) {
        fetch(`${urlBase}/image/info/${id}`)
            .then((response) => {
                if (response.ok) return response.blob();
                return;
            })
            .then((blob) => {
                if (blob) {
                    const urlx = URL.createObjectURL(blob);
                    setUrl(urlx);
                    //console.log(urlx);
                }
            })
            .catch((error) => {
                setUrl("");
            });
    }


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.userInfoSection}>
                    <View style={{ flexDirection: 'row', marginLeft: 7, }}>
                        <Avatar.Image source={url}
                                      size={80} />

                        <View style={{marginLeft: 20}}>
                            <Title style={[styles.title, {marginTop: 15, marginBottom: 5,}]}> {user.nom}</Title>
                            <Caption style={styles.caption}>{user.email}</Caption>
                        </View>
                    </View>

                    <View style={[styles.userInfoSection, {marginTop: '10%', marginLeft: '-10%'}]}>
                        <View style={styles.row}>
                            <Icon name="map-marker-radius" color="#777777" size={20} />
                            <Text style={{color: '#777777', marginLeft: 20}}>User adress</Text>
                        </View>
                        <View style={styles.row}>
                            <Icon name="phone" color="#777777" size={20} />
                            <Text style={{color: '#777777', marginLeft: 20}}>+94 76 131 7667</Text>
                        </View>
                        <View style={styles.row}>
                            <Icon name="email" color="#777777" size={20} />
                            <Text style={{color: '#777777', marginLeft: 20}}>{user.email}</Text>
                        </View>
                    </View>

                    <View style={styles.infoBoxWrapper}>
                        <View style={[styles.infoBox, {borderRightColor: '#dddddd', borderRightWidth: 1,}]}>
                            <Title>{projects.length}</Title>
                            <Caption>created projects</Caption>
                        </View>

                        <View style={styles.infoBox}>
                            <Title>{userParticipationProjects.length}</Title>
                            <Caption>participations in other projects</Caption>
                        </View>
                    </View>
                    <View style={styles.infoBoxWrapper}>
                        <View style={[styles.infoBox, {borderRightColor: '#dddddd', borderRightWidth: 1,}]}>
                            <Title>{tasks.length}</Title>
                            <Caption>received tasks</Caption>
                        </View>

                        <View style={styles.infoBox}>
                            <Title>{validatedTasks.length}</Title>
                            <Caption>completed tasks</Caption>
                        </View>
                    </View>
                </View>


            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop:10,
        flex: 1,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    infoBoxWrapper: {
        borderBottomColor: '#777777',
        borderBottomWidth: 1,
        borderTopColor: '#777777',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        flex:1,
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 5,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
});