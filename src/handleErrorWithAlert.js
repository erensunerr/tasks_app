import {Alert} from "react-native";

const handleErrorWithAlert = (errorCode, ALERTS) => {
    if (!(errorCode in ALERTS)) {
        console.error('handleErrorWithAlert failed:', errorCode);
        return
    }

    Alert.alert(...ALERTS[errorCode]);
    console.log(`${errorCode} handled successfully.`)
}

export default handleErrorWithAlert;