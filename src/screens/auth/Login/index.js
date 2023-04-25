import { useState } from "react";
import { SafeAreaView, Text, TextInput, View, TouchableOpacity, ScrollView } from "react-native";
import Button from "../../../components/Button";
import InputBox from "../../../components/InputBox";
import styles from "./styles";
import Anchor from "../../../components/Anchor";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../constants/colors";



const Login = () => {
    const nav = useNavigation();

    // State
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');


    const handleLogin = () => {
        //  called when login is pressed
        console.log(`Logging in with ${email}, ${pass}.`)
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