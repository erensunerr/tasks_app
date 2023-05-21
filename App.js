import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";

import Onboarding from './src/screens/auth/Onboarding';
import Login from "./src/screens/auth/Login";
import Signup from "./src/screens/auth/Signup";
import store from "./src/redux/store";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { useEffect} from "react";
import Home from "./src/screens/app/Home";
import Tasks from "./src/screens/app/Tasks";
import {createDrawerNavigator} from "@react-navigation/drawer";
import DrawerMenu from "./src/screens/app/DrawerMenu";
import AddTask from "./src/screens/app/AddTask";

import { Feather } from '@expo/vector-icons';
import colors from "./src/constants/colors";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

// Redux Imports
import {Provider as ReduxProvider, useSelector, useDispatch} from 'react-redux';
import { set_user } from "./src/redux/slices/user";
import {set_tasks} from "./src/redux/slices/tasks";


const OnboardingStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function App() {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        // Now we can login, logout etc. with firebase functions and still have the state in redux.
        return auth().onAuthStateChanged(
            user => {
                dispatch(set_user(user));
            }
        );
    }, []);

    useEffect(() => {
        if (!user) {
            return
        }
        const subscriber = firestore()
            .collection('users')
            .doc(user.uid)
            .onSnapshot(documentSnapshot => {
                dispatch(set_tasks(
                    documentSnapshot.data()?.tasks
                ))
            });

        // Stop listening for updates when no longer required
        return () => subscriber();
    }, [user]);

    const Tabs = () => (
        <Tab.Navigator screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,
        }}>
            <Tab.Screen name={'home'} component={Home} options={{
                title: "Home",
                tabBarIcon: ({focused, size}) => (
                    <Feather
                        name="home"
                        size={size}
                        color={focused ? colors.blue : colors.light_gray}
                    />
                )
            }}/>
            <Tab.Screen name={'tasks'} component={Tasks} options={{
                title: "Tasks",
                tabBarIcon: ({focused, size}) => (
                    <Feather
                        name="calendar"
                        size={size}
                        color={focused ? colors.blue : colors.light_gray}
                    />
                )
            }} />
        </Tab.Navigator>
    )

    if (user) {
        return (
            // If signed in load the full app, which is in a drawer navigator
                <Drawer.Navigator
                    drawerContent={DrawerMenu}
                    screenOptions={({ navigation, route }) => ({
                        title: (() => {
                            // get the name from the child (tab) navigator
                            const name = getFocusedRouteNameFromRoute(route);
                            switch (name) {
                                case 'home':
                                    return 'Home'
                                case 'tasks':
                                    return 'Tasks'
                                default:
                                    return name
                            }
                        })(),
                        drawerType: 'front',
                    })}
                >
                    <Drawer.Screen name={'tabs'} component={Tabs} />
                    <Drawer.Screen name={'addTask'} component={AddTask} options={{
                        headerShown: false,
                    }}/>
                </Drawer.Navigator>
        )
    }

    return (
            // If no user, load the onboarding flow
            <OnboardingStack.Navigator screenOptions={{
              header: () => (<StatusBar style="dark" />),
              gestureEnabled: false,
            }}>
                <OnboardingStack.Screen name={'onboarding'} component={Onboarding} />
                <OnboardingStack.Screen name={'signup'} component={Signup}  />
                <OnboardingStack.Screen name={'login'} component={Login} />
            </OnboardingStack.Navigator>
    );
}


const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: "#fff",
    }
}

// Wrap app with the necessary contexts before exporting.
export default () => (
    <ReduxProvider store={store}>
        <NavigationContainer theme={theme}>
            <App />
        </NavigationContainer>
    </ReduxProvider>
)
