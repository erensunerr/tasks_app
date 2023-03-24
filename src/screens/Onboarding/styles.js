import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
    bg_image: {
        width: '100%',
        height: '80%',
    },
    modal: {
        marginTop: '-50%',
        backgroundColor: "#ffffff",
        flexGrow: 1,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 24,
        paddingTop: 64,
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        width: '80%',
    },
    subtitle: {
        color: "#808080",
        marginTop: 16,
        fontSize: 16,
        textAlign: "center",
        width: '75%',
    },
    button_group: {
        width: "100%",
        alignItems: "center",
        marginTop: 32,
    }
})

export default styles;