import styles from "./styles";
import {Pressable, View} from "react-native";


function Checkbox({ value, onValueChange, style }) {
    return (
        <Pressable
            style={[styles.checkbox, style]}
            onPress={onValueChange}
            hitSlop={4}
        >
            {
                value ? <View style={styles.innerSquare}/> : null
            }
        </Pressable>
    );
}

export default Checkbox;