import {Text, SafeAreaView} from "react-native";
import PlusIcon from "../../../components/PlusIcon";
const Home = () => {
    return (
        <SafeAreaView style={{alignItems: "center", justifyContent: "center", flex: 1}}>
            <Text>Home page</Text>
            <PlusIcon />
        </SafeAreaView>
    )
};

export default Home;