import {SafeAreaView, Text, View, ScrollView} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useState} from "react";
import * as Linking from 'expo-linking';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import Button from "../../../components/Button";
import InputBox from "../../../components/InputBox";
import Anchor from "../../../components/Anchor";
import Checkbox from "../../../components/Checkbox";
import LINKS from "../../../constants/links";

import styles from "./styles";
import handleErrorWithAlert from "../../../handleErrorWithAlert";

// TODOx: make a modal for auth errors, -> using alert
// TODOx: add the first name and last name to firestore users collection
// TODOx: confirm password, require legal agreements




const Signup = () => {
    const nav = useNavigation();

    // State
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [agreed, setAgreed] = useState(false);


    const ALERTS = {
        'local/password-does-not-match': [
            'Passwords do not match',
            'You need to review your password confirmation.',
            [
                {
                    text: "Okie",
                    onPress: () => setConfirmPass('')
                }
            ]
        ],
        'local/did-not-agree-legally': [
            'Bruh agree to legal shitz',
            'Cmon',
            [
                {
                    text: "Okie",
                    onPress: () => setEmail('')
                }
            ]
        ],
        'auth/email-already-in-use': [
            'Email in use :(',
            'This email has been used already.',
            [
                {
                    text: "Okie",
                    onPress: () => setEmail('')
                }
            ]
        ]
    }

    const handleSignup = () => {
        console.log(`Signing up with ${firstName}, ${lastName}, ${email}, ${pass}, ${confirmPass}.`)
        if (pass !== confirmPass) {
            handleErrorWithAlert('local/password-does-not-match', ALERTS);
            return
        }

        if (!agreed) {
            handleErrorWithAlert('local/did-not-agree-legally', ALERTS);
            return
        }

        auth()
            .createUserWithEmailAndPassword(email, pass)
            .then(async (userCredential) => {
                const uid = userCredential.user.uid;
                console.log('X')

                // Add additional info to firestore.
                const userDocRef = firestore()
                    .collection('users').doc(uid);

                await userDocRef.set({
                    firstName,
                    lastName,
                });

                console.log('User account created & signed in!');
            })
            .catch(error => {
                handleErrorWithAlert(error.code, ALERTS);
            });

    }

    return (
        <SafeAreaView>
            {/*     Scroll View bc it makes the keyboard go away on click outside input     */}
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/*     Signup Screen    */}
                <Text style={styles.title}>Join the hub!</Text>
                <View style={styles.input_group}>
                    {/*     DO NOT TRACK ALL THE VALUES IN DIFFERENT STATES
                     Instead create a single state that contains keys like firstName: ''
                     and an onChange function that adapts to the keys.
                     */}
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