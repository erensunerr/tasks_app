import {StyleSheet} from "react-native";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
    plusIcon: {
        width: 64,
        height: 64,
        borderRadius: 100,
        backgroundColor: colors.blue,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 48,
        right: 48,
    },
    plusIconText: {
        color: colors.white,
        fontSize: 20,
        textAlign: "center",
    }
})

export default styles;