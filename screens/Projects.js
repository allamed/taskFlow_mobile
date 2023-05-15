import {Text} from "react-native";
import {useSelector} from "react-redux/es/exports";

import Project from "../components/Project";

const Projects=()=>{
    const { projects } = useSelector(
        (store) => store.allProjects
    );
    return(
        <>

        <Text>
            Projects screen
        </Text>
            { projects.map((project)=>{
            return (
                <Project key={project.id} project={project} />

           );
        })}

        </>

    );
}
export default Projects;