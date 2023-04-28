import {View, Text, SafeAreaView} from 'react-native';
import Button from "../../../components/Button";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const Demo = () => {
    const logOut = async () => {
        await auth().signOut();
        console.log('Signed out.')
    }

    return (
        <SafeAreaView style={{
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
        }}>
            <Text>Demo Page</Text>
            <View style={{width: '80%'}}>
                <Button text={'Log out'} onPress={async () => await logOut()}/>
                {/*<Button text={'Demo'} onPress={async () => await demoFunc()}/>*/}
            </View>

        </SafeAreaView>
    )
}

export default Demo;