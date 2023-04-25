import {StyleSheet} from "react-native";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        backgroundColor: colors.purple,
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderRadius: 8,
        width: '100%'
    },
    secondary: {
        backgroundColor: colors.blue,
    },
    text: {
        fontSize: 16,
        color: colors.white,
        fontWeight: "bold",
        textAlign: "center",
    }
});

export default styles;