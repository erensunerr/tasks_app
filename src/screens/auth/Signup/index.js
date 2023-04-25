import {SafeAreaView, Text, TextInput, View, TouchableOpacity, ScrollView} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useState} from "react";
import * as Linking from 'expo-linking';

import Button from "../../../components/Button";
import InputBox from "../../../components/InputBox";
import Anchor from "../../../components/Anchor";
import Checkbox from "../../../components/Checkbox";
import LINKS from "../../../constants/links";

import styles from "./styles";


const Signup = () => {
    const nav = useNavigation();

    // State
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [agreed, setAgreed] = useState(false);

    const handleSignup = () => {
        console.log(`Signing up with ${firstName}, ${lastName}, ${email}, ${pass}, ${confirmPass}.`)
    }

    return (
        <SafeAreaView>
            {/*     Scroll View bc it makes the keyboard go away on click outside input     */}
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/*     Signup Screen    */}
                <Text style={styles.title}>Join the hub!</Text>
                <View style={styles.input_group}>
                    {/*     Inputs      */}
                    <InputBox
                        placeholder={'First Name'}
                        value={firstName}
                        onChangeText={setFirstName}
                        autoComplete={'given-name'}
                        textContentType={'givenName'}
                        autoFocus
                    />
                    <InputBox
                        placeholder={'Last Name'}
                        value={lastName}
                        onChangeText={setLastName}
                        autoComplete={'family-name'}
                        textContentType={'familyName'}
                    />
                    <InputBox
                        placeholder={'Email'}
                        value={email}
                        onChangeText={setEmail}
                        autoComplete={"email"}
                        textContentType={"emailAddress"}
                        inputMode={"email"}
                    />
                    <InputBox
                        placeholder={'Password'}
                        value={pass}
                        onChangeText={setPass}
                        autoComplete={'new-password'}
                        textContentType={"newPassword"}
                        secureTextEntry
                    />
                    <InputBox
                        placeholder={'Confirm Password'}
                        value={confirmPass}
                        onChangeText={setConfirmPass}
                        autoComplete={'new-password'}
                        textConteytType={'newPassword'}
                        secureTextEntry
                    />

                    {/* Checkbox with privacy policy, and terms and conditions  */}
                    <View style={styles.text_group}>
                        <Checkbox value={agreed} onValueChange={(a) => setAgreed((prev) => !prev)} />
                        <View style={styles.text_group_wrap}>
                            <Text style={styles.text}>
                                I agree to <Anchor
                                    style={styles.link}
                                    onPress={
                                        () => Linking.openURL(LINKS.TERMS_AND_CONDITIONS)
                                    }
                                >
                                Terms and Conditions </Anchor>
                                and <Anchor
                                    style={styles.link}
                                    onPress={() => Linking.openURL(LINKS.PRIVACY_POLICY)}
                                >Privacy Policy</Anchor>.
                            </Text>
                        </View>

                    </View>

                </View>
                <Button text={'Create account'} secondary onPress={() => handleSignup()} />

                {/*     Text at the bottom      */}
                <View style={styles.centered}>
                    <Text style={styles.text}>
                        Already registered? <Anchor
                        onPress={() => nav.navigate('login')}
                        style={styles.anchor}
                        >Sign in!</Anchor>
                    </Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default Signup;