import { TouchableOpacity } from "react-native";
import styles from './styles'
import colors from "../../constants/colors";
import { Feather } from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";

const PlusIcon = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.plusIcon} onPress={() => navigation.navigate('addTask', )}>
            <Feather name="plus" size={32} color={colors.white} />
        </TouchableOpacity>
    )
}

export default PlusIcon;