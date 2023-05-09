import {createContext, useState, useEffect} from "react";
import auth from '@react-native-firebase/auth';
import firestore from "@react-native-firebase/firestore";

const UserContext = createContext({
    user: null,
    loading: true,
});

function UserContextProvider({children}) {
    // Set an initializing state whilst Firebase connects
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();

    // House user data in this state
    const [data, setData] = useState();

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (loading) setLoading(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    useEffect(() => {

        if (!user) {
            return
        }

        const subscriber = firestore()
            .collection('users')
            .doc(user.uid)
            .onSnapshot(documentSnapshot => {
                setData(documentSnapshot.data());
            });

        // Stop listening for updates when no longer required
        return () => subscriber();
    }, [user])


    const context = {
        loading,
        user,
        data
    };

    return (
        <UserContext.Provider value={context}>
            { children }
        </UserContext.Provider>
    )
}

export default UserContext;
export {UserContextProvider};