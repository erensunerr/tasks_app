import {StyleSheet} from "react-native";

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
        fontSize: 16,
        color: "#606060",
    },
    anchor: {
        color: "#4c0d80",
        fontWeight: "bold",
    },
    text_group: {
        flexDirection: "row",
        marginTop: 24,
        justifyContent: "center",
    }
});

export default styles;