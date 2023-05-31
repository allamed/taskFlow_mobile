import {View, Text} from "react-native";

const ProjectTasks = ({tasks}) => {
    return(
        <View>
            <Text>Tasks :</Text>
            {tasks.map((task)=>(
                <Text>{task.titre}</Text>
            ))}

        </View>

    );
}
export default ProjectTasks;