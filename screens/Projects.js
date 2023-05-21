import {Text} from "react-native";


import Project from "../components/Project";
import {Provider, useDispatch, useSelector} from "react-redux";
import {store} from "../store";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getAllProjects} from "../features/project/projectSlice";

const Projects=()=>{
    useEffect(() => {
        async function fetchUser() {
            const email = await AsyncStorage.getItem('email');            // convert to object format
            setUserEmail(email);
            // console.log(" tab b ", email);

        }

        fetchUser();


    }, []);
    const [userEmail, setUserEmail]=useState("");

    const dispatch = useDispatch();
    dispatch(getAllProjects(userEmail));
    return (<AllProjects/>);

}
const AllProjects=()=>{

    const { projects } = useSelector(
        (store) => store.allProjects
    );
   /* const projects=[{"id":1,"nom":"inventaire total    du magasin","chef":{"id":1,"nom":"allam","email":"allam@gmail.com"},"membres":[{"id":2,"nom":"aouad","email":"aouad@gmail.com"},{"id":2,"nom":"aouad","email":"aouad@gmail.com"},{"id":3,"nom":"imami","email":"imami@gmail.com"},{"id":2,"nom":"aouad","email":"aouad@gmail.com"},{"id":3,"nom":"imami","email":"imami@gmail.com"},{"id":4,"nom":"taha","email":"taha@gmail.com"}],"debut":"2023-05-16"},{"id":2,"nom":"réalisation de la documentation de maintenance des machines numériques","chef":{"id":1,"nom":"allam","email":"allam@gmail.com"},"membres":[{"id":5,"nom":"ilyas","email":"ilyas@gmail.com"},{"id":5,"nom":"ilyas","email":"ilyas@gmail.com"},{"id":6,"nom":"hicham","email":"hicham@gmail.com"}],"debut":"2023-05-16"},{"id":3,"nom":"rédaction d'un cahier de charge pour un marché d'acquisition de véhicules de transport","chef":{"id":1,"nom":"allam","email":"allam@gmail.com"},"membres":[{"id":2,"nom":"aouad","email":"aouad@gmail.com"},{"id":2,"nom":"aouad","email":"aouad@gmail.com"},{"id":3,"nom":"imami","email":"imami@gmail.com"},{"id":2,"nom":"aouad","email":"aouad@gmail.com"},{"id":3,"nom":"imami","email":"imami@gmail.com"},{"id":4,"nom":"taha","email":"taha@gmail.com"},{"id":2,"nom":"aouad","email":"aouad@gmail.com"},{"id":3,"nom":"imami","email":"imami@gmail.com"},{"id":4,"nom":"taha","email":"taha@gmail.com"},{"id":5,"nom":"ilyas","email":"ilyas@gmail.com"}],"debut":"2023-05-16"}]
    */  return(
        <>


            { projects.map((project)=>{
            return (
                <Project key={project.id} project={project} />

           );
        })}

        </>

    );
}
export default Projects;