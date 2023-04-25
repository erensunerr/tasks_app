import {StyleSheet} from "react-native";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
    checkbox: {
        width: 24,
        height: 24,
        borderStyle: "solid",
        borderColor: colors.purple,
        borderWidth: 1,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
    },
    innerSquare: {
        width: '80%',
        height: '80%',
        backgroundColor: colors.purple,
        borderRadius: 4,

    }
});

export default styles;