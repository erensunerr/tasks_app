import {Text, TouchableOpacity} from "react-native";
import styles from "./styles";

const Anchor = ({text, style, ...props}) => {
    return <TouchableOpacity style={styles.container} {...props}>
        <Text style={[styles.anchor, style]}>{text}</Text>
    </TouchableOpacity>;
}

// TODO: make this work within a text component instead of using a parent view.

export default Anchor;