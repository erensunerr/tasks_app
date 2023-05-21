import * as Linking from "expo-linking";
import auth from "@react-native-firebase/auth";
import {useNavigation} from "@react-navigation/native";

import LINKS from "../../../constants/links";
import styles from "./styles";


import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

const DrawerMenu = (props) => {
    const navigation = useNavigation();


    const DRAWER_MENU_ITEMS = [
        {
            title: "Home",
            onPress: ({ navigation }) => navigation.navigate('home')
        },
        {
            title: "Tasks",
            onPress: ({ navigation }) => navigation.navigate('tasks')
        },
        {
            title: "Privacy Policy",
            onPress: ({ navigation }) => Linking.openURL(LINKS.TERMS_AND_CONDITIONS)
        },
        {
            title: "Terms & Conditions",
            onPress: ({ navigation }) => Linking.openURL(LINKS.PRIVACY_POLICY)
        },
        {
            title: "Log out",
            onPress: () => auth().signOut().catch(
                (err) => console.error(`Log out error: ${err}`)
            ),
        }
    ]

    return (
        <DrawerContentScrollView {...props}>
            {
                DRAWER_MENU_ITEMS.map(
                    ({title, onPress}) =>
                        <DrawerItem label={title} onPress={(...e) => onPress({ ...e, navigation })} key={title} />
                )
            }
        </DrawerContentScrollView>
    )
}

export default DrawerMenu;