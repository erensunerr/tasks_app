import {Text, SafeAreaView, ScrollView, View} from "react-native";
import PlusIcon from "../../../components/PlusIcon";
import {useContext} from "react";
import UserContext from "../../../components/UserContext";
import styles from "./styles";
import getTaskCompletedHandler from "../../../getTaskCompleteHandler";
import Task from "../../../components/Task";

const Home = () => {
    const {data, user} = useContext(UserContext);
    const tasks = data?.tasks;

    // Get stuff that's due today.
    const currentDate = (new Date()).getTime();
    const getTimeDelta = (t) =>  t - currentDate;

    // const pastDeadline = tasks?.filter(
    //     ({ deadline, completed }) => !completed && (
    //         0 <= getTimeDelta(deadline.toDate().getTime()) &&
    //         getTimeDelta(deadline.toDate().getTime()) <= 24 * 60 * 60 * 1000
    //     )
    // )

    // tasks?.forEach(
    //     ({ deadline }) => console.log(
    //         deadline.toDate().getTime(),
    //         currentDate,
    //         0 <= getTimeDelta(deadline.toDate().getTime()) &&
    //         getTimeDelta(deadline.toDate().getTime()) <= 24 * 60 * 60 * 1000,
    //     )
    // )
    const pastDeadline = tasks?.filter(
        ({ deadline, completed }) => !completed && (
            getTimeDelta(deadline.toDate().getTime()) < 0
        )
    )

    const dueToday = tasks?.filter(
        ({ deadline, completed }) => !completed && (
            0 <= getTimeDelta(deadline.toDate().getTime()) &&
            getTimeDelta(deadline.toDate().getTime()) <= 24 * 60 * 60 * 1000
        )
    )

    // Tasks that are due next week
    const dueNextWeek = tasks?.filter(
        ({ deadline, completed }) => !completed && (
            (24 * 60 * 60 * 1000) < getTimeDelta(deadline.toDate().getTime()) &&
            getTimeDelta(deadline.toDate().getTime()) <= (7 * 24 * 60 * 60 * 1000)
        )
    )

    const handleTaskCompleted = getTaskCompletedHandler(data, user);

    return (
        <SafeAreaView style={{flex: 1}}>
            {
                tasks ?
                    <ScrollView style={{ marginHorizontal: 24 }}>
                        {   // Past due
                            pastDeadline && pastDeadline.length !== 0 ?
                                <>
                                    <Text style={styles.title}>Past deadline!</Text>
                                    {
                                        pastDeadline.map(
                                            (task) => <Task
                                                task={task}
                                                onValueChange={handleTaskCompleted}
                                                key={task.id}
                                                style={{}}
                                            />
                                        )
                                    }
                                </>
                                :
                                null
                        }
                        {   // If something is due today, display it.
                            dueToday && dueToday.length !== 0 ?
                                <>
                                    <Text style={styles.title}>Due Today</Text>
                                    {
                                        dueToday.map(
                                            (task) => <Task
                                                task={task}
                                                onValueChange={handleTaskCompleted}
                                                key={task.id}
                                                style={{}}
                                            />
                                        )
                                    }
                                </>
                                :
                                null
                        }
                        {
                            // Due to next week
                            dueNextWeek && dueNextWeek.length !== 0 ?
                                <>
                                    <Text style={styles.title}>Due Next Week</Text>
                                    {
                                        dueNextWeek.map(
                                            (task) => <Task
                                                task={task}
                                                onValueChange={handleTaskCompleted}
                                                key={task.id}
                                                style={{}}
                                            />
                                        )
                                    }

                                </> :
                                null
                        }

                    </ScrollView>
                    :
                    // No tasks
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

export default Home;