import {Text, SafeAreaView, ScrollView, View} from "react-native";
import {useSelector} from "react-redux";

import Task from "../../../components/Task";
import PlusIcon from "../../../components/PlusIcon";
import styles from "./styles";
import firestore from "@react-native-firebase/firestore";


const Home = () => {
    const {tasks} = useSelector(state => state.tasks);
    const {user} = useSelector(state => state.user);

    // Get stuff that's due today.
    const currentDate = (new Date()).getTime();
    const getTimeDelta = (t) =>  t - currentDate;

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

    const dueNextWeek = tasks?.filter(
        ({ deadline, completed }) => !completed && (
            (24 * 60 * 60 * 1000) < getTimeDelta(deadline.toDate().getTime()) &&
            getTimeDelta(deadline.toDate().getTime()) <= (7 * 24 * 60 * 60 * 1000)
        )
    )

    const is_completed = [...pastDeadline, ...dueNextWeek, ...dueToday].reduce(
        (acc, task) => acc && task.completed,
        true
    )
    const handleTaskCompletion = (task) => {
        const docRef = firestore()
            .collection('users')
            .doc(user.uid);

        const otherTasks = tasks.filter(
            t => t.id !== task.id
        )

        docRef.update({
            tasks: [...otherTasks, {...task, completed: !task.completed}]
        }).catch(
            (err) => console.error(`Task completion error: ${err}.`)
        )

    }

    const displayTasks = (tasks, title) => (
        tasks && tasks.length !== 0 ?
            <>
                <Text style={styles.title}>{title}</Text>
                {
                    tasks.map(
                        (task) => <Task
                            task={task}
                            onValueChange={() => handleTaskCompletion(task)}
                            key={task.id}
                        />
                    )
                }
            </>
            :
            null
    )

    return (
        <SafeAreaView style={{flex: 1}}>
            {
                is_completed &&
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <Text style={{
                        fontWeight: "bold",
                        textAlign: "center",
                    }}>You're done.</Text>
                </View>
            }
            {
                tasks ?
                    <ScrollView style={{ marginHorizontal: 24 }}>
                        <>
                            { displayTasks(pastDeadline, 'Past Deadline') }
                            { displayTasks(dueToday, 'Due Today') }
                            { displayTasks(dueNextWeek, 'Next Week') }
                        </>
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