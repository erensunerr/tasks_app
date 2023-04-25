import {StyleSheet} from "react-native";
import colors from "../../../constants/colors";

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 24,
        flexGrow: 1,
        height: '100%',
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginTop: 32,
    },
    input_group: {
        marginVertical: 32,
    },
    text: {
        marginVertical: 24,
        fontSize: 16,
        color: colors.gray,
        textAlign: "center",
    },
    anchor: {
        color: colors.purple,
        fontWeight: "bold",
    }
});

export default styles;