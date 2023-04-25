import {TextInput} from "react-native";
import styles from "./styles";

const InputBox = ({ placeholder, style, ...otherProps }) => {
    return (
        <TextInput
            style={[styles.input, style]}
            placeholder={placeholder}
            placeholderTextColor={"#606060"}
            {...otherProps}
        />
    );
}

export default InputBox;