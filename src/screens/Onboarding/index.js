import {SafeAreaView, View, Text, Image} from "react-native";
import onboarding_background from '../../../assets/onboarding_background.jpg';
import styles from "./styles";
import Button from "../../components/Button";


const Onboarding = () => {
    return (
        <View style={styles.container}>
            <Image source={onboarding_background} style={styles.bg_image}/>
            <View style={styles.modal}>
                <Text style={styles.title}>Best task management app</Text>
                <Text style={styles.subtitle}>
                    Get organized by sorting out all your tasks and boost your productivity.
                </Text>

                <View style={styles.button_group}>
                    <Button text={"Log in"} />
                    <Button text={"Get started"} style={{backgroundColor: "#10869e"}} />
                </View>


            </View>
        </View>
    )
}

export default Onboarding;