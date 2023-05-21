import {useState} from "react";
import {Text, SafeAreaView, View, ScrollView} from "react-native";
import {useSelector} from "react-redux";

import PlusIcon from "../../../components/PlusIcon";
import styles from "./styles";
import TagSelector from "../../../components/TagSelector";
import Task from "../../../components/Task";
import firestore from '@react-native-firebase/firestore';

import handleErrorWithAlert from "../../../handleErrorWithAlert";

const Tasks = () => {
    const [selectedTags, setSelectedTags] = useState([]);

    const {tasks} = useSelector(state => state.tasks);
    const {user} = useSelector(state => state.user);

    const handleTaskCompletion = (task) => {
        const docRef = firestore()
            .collection('users')
            .doc(user.uid);
        docRef.update({
            tasks: tasks.map(
                (t) => t.id === task.id ? {...t, completed: !t.completed} : t
            )
        }).catch(
            (err) => console.error(`Task completion error: ${err}.`)
        )
    }

    return (
        <SafeAreaView style={[ styles.container ]}>

            {
                tasks && tasks.length !== 0 ?
                <>
                    <Text style={[ styles.title, styles.with_margin ]}>To do Tasks</Text>
                    <TagSelector
                        selectedTags={selectedTags}
                        setSelectedTags={setSelectedTags}
                        style={{
                            flexGrow: 0,
                            marginTop: 24,
                        }}
                    />
                    {/*// User has tasks*/}
                    <ScrollView style={{
                        marginTop: 32,
                    }}>
                        {
                            tasks.filter(
                                (task) => (
                                    (selectedTags.length === 0) ||
                                    (selectedTags.filter(
                                        tag => task.tags && task.tags.includes(tag)
                                    ).length !== 0)
                                )
                            ).map(
                                (task) => <Task task={task}
                                                onValueChange={() => handleTaskCompletion(task)}
                                                style={styles.with_margin}
                                                key={task.id}
                                />
                            )
                        }

                    </ScrollView>
                </>
                :
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <Text style={{
                        fontWeight: "bold",
                        textAlign: "center",
                    }}>Please add a task using the + button.</Text>
                </View>
            }
            <PlusIcon />
        </SafeAreaView>
    )
};

export default Tasks;