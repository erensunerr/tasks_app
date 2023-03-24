import {SafeAreaView, View, Text, ImageBackground} from "react-native";
import onboarding_background from '../../../assets/onboarding_background.jpg';
import styles from "./styles";
import Button from "../../components/Button";


const Onboarding = () => {
    return (
        <View style={styles.container}>
            <ImageBackground source={onboarding_background} style={styles.image}>
                {/*     Onboarding screen is a modal with and image background*/}
                <View style={styles.modal}>
                    <Text style={styles.title}>Best task management app</Text>
                    <Text style={styles.subtitle}>
                        Get organized by sorting out all your tasks and boost your productivity.
                    </Text>

                    <View style={styles.button_group}>
                        <Button text={"Log in"} />
                        <Button text={"Get started"} secondary />
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

export default Onboarding;