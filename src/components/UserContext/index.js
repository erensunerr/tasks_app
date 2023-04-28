import {createContext, useState, useEffect} from "react";
import auth from '@react-native-firebase/auth';

const UserContext = createContext({
    user: null,
    loading: true,
});

function UserContextProvider({children}) {
    // Set an initializing state whilst Firebase connects
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (loading) setLoading(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    console.log('Initializing:', loading);
    console.log('User:', user);

    const context = {
        loading,
        user,
    }

    return (
        <UserContext.Provider value={context}>
            { children }
        </UserContext.Provider>
    )
}

export default UserContext;
export {UserContextProvider};