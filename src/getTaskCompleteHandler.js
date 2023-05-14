import firestore from "@react-native-firebase/firestore";
import handleErrorWithAlert from "./handleErrorWithAlert";

const getTaskCompletedHandler = (data, user) => (task) => {
    let tasks = data.tasks;

    // Handle completion
    const docRef = firestore()
        .collection('users')
        .doc(user.uid);


    const task_new = tasks.filter(
        (t) => t.id === task.id
    )


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
}

export default getTaskCompletedHandler;