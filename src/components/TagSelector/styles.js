import {StyleSheet} from "react-native";
import colors from "../../constants/colors";
const styles = StyleSheet.create({
    tag_container: {
        marginTop: 8,
    },
    tag_view: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.dark_blue,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginRight: 8,
    },
    selected_tag: {
        borderWidth: 0,
        paddingHorizontal: 21,
        paddingVertical: 11,
        backgroundColor: colors.light_gray,
    },
    tag_text: {
        fontWeight: "bold",
        fontSize: 12,
        color: colors.blue,
    },
    first_tag: {
        marginLeft: 24,
    },
    last_tag: {
        marginRight: 24,
    },
})

export default styles;