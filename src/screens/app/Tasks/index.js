import {Text, SafeAreaView, View, ScrollView} from "react-native";
import PlusIcon from "../../../components/PlusIcon";
import styles from "./styles";
import TagSelector from "../../../components/TagSelector";
import {useContext, useState} from "react";
import Checkbox from "../../../components/Checkbox";
import UserContext from "../../../components/UserContext";
import firestore from "@react-native-firebase/firestore";
import handleErrorWithAlert from "../../../handleErrorWithAlert";

const Tasks = () => {
    const [selectedTags, setSelectedTags] = useState([]);

    const { user, data } = useContext(UserContext);

    return (
        <SafeAreaView style={[ styles.container ]}>
            {/*     Title       */}
            <Text style={[ styles.title, styles.with_margin ]}>To do Tasks</Text>
            <TagSelector
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                style={{
                    flexGrow: 0,
                    marginTop: 24,
                }}
            />
            {
                data.tasks ?
                    // User has tasks
                    null
                :
                    // User doesn't have tasks
                    null
            }
            <ScrollView style={{
                marginTop: 32,
            }}>
                {
                    data.tasks.filter(
                        (task) => (
                            (selectedTags.length === 0) ||
                            (selectedTags.filter(
                                tag => task.tags && task.tags.includes(tag)
                            ).length !== 0)
                        )
                    ).map(
                        (task) => (
                            <View key={task.id}
                                style={[ styles.with_margin, {
                                flexDirection: "row",
                                marginTop: 8,
                                alignItems: "center",
                            }]} >
                                <Checkbox
                                    value={task.completed}
                                    onValueChange={() => {
                                        let tasks = data.tasks;

                                        // Handle completion
                                        const docRef = firestore()
                                            .collection('users')
                                            .doc(user.uid);

                                        console.log('Task', task, tasks)

                                        const task_new = tasks.filter(
                                            (t) => t.id === task.id
                                        )

                                        console.log(task_new);

                                        task_new[0].completed = !task_new[0].completed;

                                        docRef.update({
                                            tasks: tasks,
                                        }).then(
                                            () => {
                                                console.log("Tasks updated");
                                            }
                                        ).catch(
                                            (err) => {
                                                handleErrorWithAlert(err.code, {});
                                            }
                                        )

                                    }}
                                />
                                <Text style={{
                                    marginLeft: 8,
                                    fontSize: 16,
                                    fontWeight: "bold",
                                }}>{task.description}</Text>
                            </View>
                        )
                    )
                }

            </ScrollView>


            <PlusIcon />
        </SafeAreaView>
    )
};

export default Tasks;