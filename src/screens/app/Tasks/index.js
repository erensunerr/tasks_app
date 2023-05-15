import {Text, SafeAreaView, View, ScrollView} from "react-native";
import PlusIcon from "../../../components/PlusIcon";
import styles from "./styles";
import TagSelector from "../../../components/TagSelector";
import {useContext, useState} from "react";
import handleErrorWithAlert from "../../../handleErrorWithAlert";

import UserContext from "../../../components/UserContext";
import firestore from "@react-native-firebase/firestore";
import Task from "../../../components/Task";
import getTaskCompletedHandler from "../../../getTaskCompleteHandler";

const Tasks = () => {
    const [selectedTags, setSelectedTags] = useState([]);

    const { user, data } = useContext(UserContext);

    const handleTaskCompleted = getTaskCompletedHandler(data, user);


    return (
        <SafeAreaView style={[ styles.container ]}>

            {
                data?.tasks && data.tasks?.length !== 0 ?
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
                            data.tasks.filter(
                                (task) => (
                                    (selectedTags.length === 0) ||
                                    (selectedTags.filter(
                                        tag => task.tags && task.tags.includes(tag)
                                    ).length !== 0)
                                )
                            ).map(
                                (task) => <Task task={task}
                                                onValueChange={handleTaskCompleted}
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