import {TextInput} from "react-native";
import styles from "./styles";

const InputBox = ({ placeholder, style }) => {
    return (
        <TextInput
            style={[styles.input, style]}
            placeholder={placeholder}
            placeholderTextColor={"#606060"}
        />
    );
}

export default InputBox;