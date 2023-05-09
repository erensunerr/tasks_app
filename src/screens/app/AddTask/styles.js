import {StyleSheet} from "react-native";
import colors from "../../../constants/colors";

const styles = StyleSheet.create({
    back_button: {
        marginTop: 16,
        marginLeft: -8
    },
    title: {
        fontSize: 24,
        marginTop: 32,
        marginBottom: 8,
        color: colors.purple
    },
    container: {
        marginHorizontal: 24,
    },
    label: {
        fontWeight: "bold",
        color: colors.dark_blue,
        marginTop: 24,
        fontSize: 12
    },
    input: {
        marginTop: 8,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.dark_blue,
        paddingTop: 12
    },
})

export default styles;