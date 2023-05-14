import styles from "./styles";
import Checkbox from "../Checkbox";
import {Text, View} from "react-native";

const Task = ({task, onValueChange, style}) => (
    <View
        style={[ styles.container, style ]}
    >
        <Checkbox
            value={task.completed}
            onValueChange={() => onValueChange(task)}
        />
        <Text style={styles.description}>{task.description}</Text>
    </View>
)

export default Task;