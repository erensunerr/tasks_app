import {Text, SafeAreaView, TouchableOpacity, View, Platform, ScrollView} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation} from "@react-navigation/native";
import colors from "../../../constants/colors";
import styles from "./styles";
import InputBox from "../../../components/InputBox";
import DateTimePicker from '@react-native-community/datetimepicker';
import {useState} from "react";
import Button from "../../../components/Button";
import firestore from "@react-native-firebase/firestore";
import handleErrorWithAlert from "../../../handleErrorWithAlert";
import TagSelector from "../../../components/TagSelector";
import uuid from 'react-native-uuid';
import {useSelector} from "react-redux";
import moment from "moment";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';


const Label = ({ ...props }) => <Text style={[styles.label]} {...props} />;

// TODO: the calendar constantly opens on android
// TODO: wrap everything in a scroll view

const AddTask = () => {
    const navigation = useNavigation();
    const {user} = useSelector(state => state.user);

    // States
    const [description, setDescription] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [deadline, setDeadline] = useState(new Date());

    console.log('deadline', deadline);

    navigation.addListener(
        'focus', () => {
            // Reset state on focus
            setDescription('');
            setSelectedTags([]);
            handleSetDeadline(new Date());
        }
    )

    const handleTaskCreation = () => {
        console.log(`Adding ${description} with tags ${selectedTags} and deadline ${deadline}.`);

        console.log(`${user.uid}`)
        const userDocRef = firestore()
            .collection('users')
            .doc(user.uid);

        userDocRef.update({
            tasks: firestore.FieldValue.arrayUnion({
                description,
                deadline,
                tags: selectedTags,
                completed: false,
                id: uuid.v4(),
            }),
        }).then(() => {
            navigation.goBack();
        }).catch(
            (error) => handleErrorWithAlert(error.code, {})
        );
    }

    const handleSetDeadline = (deadline) => {
        const m = moment(deadline);
        m.minute(59);
        m.second(59);
        m.hour(23);
        setDeadline(m.toDate());
    }

    return (
        <SafeAreaView style={[ styles.container ]}>
            <ScrollView style={[ styles.scroll_container ]}>
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
                {
                    Platform.OS === 'ios' ?
                        <DateTimePicker
                            value={deadline}
                            onChange={
                                (e, d) => handleSetDeadline(d)
                            }
                        /> :
                        <TouchableOpacity style={{
                            backgroundColor: colors.light_gray,
                            borderRadius: 8,
                            paddingVertical: 8,
                            paddingHorizontal: 12,
                            marginHorizontal: 8,

                        }} onPress={() => DateTimePickerAndroid.open({
                                value: deadline,
                                onChange: (e, d) => handleSetDeadline(d)
                            })
                        }>
                            <Text>{moment(deadline).format('MMM D, YYYY')}</Text>
                        </TouchableOpacity>
                }
            </View>

            {/*     Add task button    */}
            <Button
                text={'Add the task'}
                secondary={true}
                style={{
                    marginTop: 32,
                }}
                onPress={() => handleTaskCreation()} />
            </ScrollView>
        </SafeAreaView>
    )
};

export default AddTask;