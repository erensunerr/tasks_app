import {Text, SafeAreaView, TouchableOpacity, View, ScrollView} from "react-native";
import { Feather } from "@expo/vector-icons";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import colors from "../../../constants/colors";
import styles from "./styles";
import InputBox from "../../../components/InputBox";
import DateTimePicker from '@react-native-community/datetimepicker';
import {useContext, useState} from "react";
import Button from "../../../components/Button";
import UserContext from "../../../components/UserContext";
import firestore from "@react-native-firebase/firestore";
import handleErrorWithAlert from "../../../handleErrorWithAlert";
import TagSelector from "../../../components/TagSelector";
import uuid from 'react-native-uuid';


const Label = ({ ...props }) => <Text style={[styles.label]} {...props} />;

const AddTask = () => {
    const navigation = useNavigation();
    const {user} = useContext(UserContext);

    // States
    const [description, setDescription] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [deadline, setDeadline] = useState(new Date());

    navigation.addListener(
        'focus', () => {
            // Reset state on focus
            setDescription('');
            setSelectedTags([]);
            setDeadline(new Date());
        }
    )
    // useFocusEffect(
    //     () => {
    //
    //     }
    // )

    return (
        <SafeAreaView style={[ styles.container ]}>
            <View style={[ styles.back_button ]}>

                {/*     Header (go back button)     */}
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather
                        name={'chevron-left'}
                        size={32}
                        color={colors.purple}
                    />
                </TouchableOpacity>
            </View>

            {/*     Title           */}
            <Text style={[ styles.title ]}>Add New Task</Text>


            {/*     Task description     */}
            <Label>Describe the task</Label>
            <InputBox
                placeholder={"Type here..."}
                style={[ styles.input ]}
                multiline={true}
                textAlignVertical={'top'}
                scrollEnabled={false}
                value={description}
                onChangeText={(text) => setDescription(text)}
            />

            {/*     Task Type    */}
            <Label>Type</Label>
            <TagSelector
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                style={{
                    marginHorizontal: -24,
                }}
            />

            {/*     Deadline        */}
            <Label>Deadline</Label>
            <View style={{
                flexDirection: "row",
                marginTop: 8,
                paddingVertical: 8,
                borderWidth: 1,
                borderRadius: 8,
                borderColor: colors.dark_blue,
            }}>
                <DateTimePicker
                    value={deadline}
                    onChange={
                        (e, d) => setDeadline(d)
                    }
                />
            </View>

            {/*     Add task button    */}
            <Button
                text={'Add the task'}
                secondary={true}
                style={{
                    marginTop: 32,
                }}
                onPress={() => {
                    // Handle submit
                    console.log(`Adding ${description} with tags ${selectedTags} and deadline ${deadline}.`);

                    const midnightDeadline = new Date(
                        deadline.getFullYear(),
                        deadline.getMonth(),
                        deadline.getDate(),
                        23,
                        59,
                        59,
                    )

                    const uid = user.uid;
                    const userDocRef = firestore()
                        .collection('users')
                        .doc(uid);
                    userDocRef.update({
                        tasks: firestore.FieldValue.arrayUnion({
                            description,
                            tags: selectedTags,
                            deadline: midnightDeadline,
                            completed: false,
                            id: uuid.v4(),
                        }),
                    }).then(() => {
                        // Reset state

                        navigation.goBack();
                    }).catch(
                        (error) => handleErrorWithAlert(error.code, {})
                    );
                }} />
        </SafeAreaView>
    )
};

export default AddTask;