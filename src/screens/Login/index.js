import {SafeAreaView, Text, TextInput, View, TouchableOpacity, ScrollView} from "react-native";
import Button from "../../components/Button";
import InputBox from "../../components/Input";
import styles from "./styles";
import Anchor from "../../components/Anchor";
import {useNavigation} from "@react-navigation/native";


const Login = () => {
    const nav = useNavigation();

    return (
        <SafeAreaView>
            {/*     Scroll View bc it makes the keyboard go away on click outside input     */}
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/*     Login Screen    */}
                <Text style={styles.title}>Welcome back!</Text>
                <View style={styles.input_group}>
                    {/*     Inputs      */}
                    <InputBox placeholder={'Email'}/>
                    <InputBox placeholder={'Password'}/>
                </View>
                <Button text={'Log in'}/>

                {/*     Text at the bottom      */}
                <View style={styles.text_group}>
                    <Text style={styles.text}>Not registered? </Text>
                    <Anchor text={'Sign up!'} onPress={() => nav.navigate('signup')}/>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default Login;