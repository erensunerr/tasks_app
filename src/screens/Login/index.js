import {SafeAreaView, Text, TextInput, View, TouchableOpacity, ScrollView} from "react-native";
import Button from "../../components/Button";
import InputBox from "../../components/Input";
import styles from "./styles";
const Login = () => {
    return (
        <SafeAreaView>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Welcome back!</Text>
                <View style={styles.input_group}>
                    <InputBox placeholder={'Email'} />
                    <InputBox placeholder={'Password'} />
                </View>
                <Button text={'Log in'} />
                <View style={styles.text_group}>
                    <Text style={styles.text}>Not registered? </Text>
                    <TouchableOpacity>
                        <Text style={[styles.text, styles.anchor]}>Sign up!</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default Login;