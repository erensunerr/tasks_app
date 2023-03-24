import {Text, TouchableOpacity} from "react-native";
import styles from "./styles";

function Button({text, style, ...props}) {
    return (
        <TouchableOpacity style={[styles.container, style]} activeOpacity={0.5} {...props}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}

export default Button