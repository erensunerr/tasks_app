import {SafeAreaView, Text, TextInput, View, TouchableOpacity, ScrollView} from "react-native";
import Checkbox from 'expo-checkbox';

import Button from "../../components/Button";
import InputBox from "../../components/Input";
import Anchor from "../../components/Anchor";
import styles from "./styles";
import {useNavigation} from "@react-navigation/native";

const Signup = () => {
    const nav = useNavigation();

    return (
        <SafeAreaView>
            {/*     Scroll View bc it makes the keyboard go away on click outside input     */}
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/*     Signup Screen    */}
                <Text style={styles.title}>Join the hub!</Text>
                <View style={styles.input_group}>
                    {/*     Inputs      */}
                    <InputBox placeholder={'First Name'} />
                    <InputBox placeholder={'Last Name'} />
                    <InputBox placeholder={'Email'} />
                    <InputBox placeholder={'Password'} />
                    <InputBox placeholder={'Confirm Password'} />

                    <View style={styles.text_group}>
                        <Checkbox />
                        <Text style={styles.text}>I agree to</Text>
                        <Anchor text={'Terms and Conditions'} style={styles.text} />
                        <Text style={styles.text}>and</Text>
                        <Anchor text={'Privacy Policy'} style={styles.text} />
                        <Text style={styles.text}>.</Text>
                    </View>

                </View>
                <Button text={'Sign up'} />

                {/*     Text at the bottom      */}
                <View style={styles.text_group}>
                    <Text style={styles.text}>Already registered?</Text>
                    <Anchor text={'Sign in!'} onPress={() => nav.navigate('login')} />
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default Signup;