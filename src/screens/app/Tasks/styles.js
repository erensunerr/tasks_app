import {StyleSheet} from "react-native";
import colors from "../../../constants/colors";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    title: {
        fontSize: 24,
        marginTop: 32,
        marginBottom: 8,
        color: colors.purple
    },
    with_margin: {
        marginHorizontal: 24
    }
})

export default styles;