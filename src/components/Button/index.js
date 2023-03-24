import {Text, TouchableOpacity} from "react-native";
import styles from "./styles";

function Button({text, style, secondary, ...props}) {
    return (
        <TouchableOpacity
            style={[styles.container, secondary && styles.secondary, style]}
            activeOpacity={0.5} {...props}
        >
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}

export default Button