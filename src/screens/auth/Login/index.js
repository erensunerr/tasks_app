import { useState } from "react";
import { SafeAreaView, Text, TextInput, View, TouchableOpacity, ScrollView } from "react-native";
import Button from "../../../components/Button";
import InputBox from "../../../components/InputBox";
import styles from "./styles";
import Anchor from "../../../components/Anchor";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../constants/colors";

import auth from '@react-native-firebase/auth';



const Login = () => {
    const nav = useNavigation();

    // State
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');


    const handleLogin = () => {
        //  called when login is pressed
        console.log(`Logging in with ${email}, ${pass}.`);

        auth()
            .signInWithEmailAndPassword(email, pass)
            .then(() => {
                console.log('User account created & signed in!');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });
    }

    return (
        <SafeAreaView>
            {/*     Scroll View bc it makes the keyboard go away on click outside input     */}
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/*     Login Screen    */}
                <Text style={styles.title}>Welcome back!</Text>
                <View style={styles.input_group}>
                    {/*     Inputs      */}
                    <InputBox
                        placeholder={'Email'}
                        value={email}
                        onChangeText={setEmail}
                        autoComplete={"email"}
                        inputMode={"email"}
                        textContentType={"emailAddress"}
                        autoFocus
                    />
                    <InputBox
                        placeholder={'Password'}
                        value={pass}
                        onChangeText={setPass}
                        autoComplete={'current-password'}
                        textContentType={"password"}
                        secureTextEntry
                    />
                </View>
                <Button text={'Log in'} onPress={() => handleLogin(email, pass)}/>

                {/*     Text at the bottom      */}
                <Text style={styles.text}>Not registered? <Anchor
                        onPress={() => nav.navigate('signup')}
                        style={styles.anchor}
                        >Sign up!
                    </Anchor>
                </Text>

            </ScrollView>
        </SafeAreaView>
    )
}

export default Login;