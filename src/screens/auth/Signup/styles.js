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
        marginTop: 32,
    },
    text: {
        fontSize: 16,
        color: colors.gray,
        marginHorizontal: 4,
        flexWrap: "wrap",
    },
    anchor: {
        color: colors.purple,
        fontWeight: "bold",
    },
    link: {
        textDecorationLine: "underline",
    },
    checkbox: {
      color: colors.gray,
    },
    text_group: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        marginVertical: 24,
    },
    text_group_wrap: {
        marginLeft: 8,
    },
    centered: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 24,
    }
});

export default styles;