import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";


import Onboarding from './src/screens/auth/Onboarding';
import Login from "./src/screens/auth/Login";
import Signup from "./src/screens/auth/Signup";
import UserContext, {UserContextProvider} from "./src/components/UserContext";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Demo from "./src/screens/app/Demo";
import {useContext} from "react";
import Home from "./src/screens/app/Home";
import Tasks from "./src/screens/app/Tasks";
import {createDrawerNavigator} from "@react-navigation/drawer";
import DrawerMenu from "./src/screens/app/DrawerMenu";
import AddTask from "./src/screens/app/AddTask";

import { getHeaderTitle } from '@react-navigation/elements';
import {View, Text, TouchableOpacity, SafeAreaView} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import colors from "./src/constants/colors";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';


const OnboardingStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function App() {
    const {user, loading} = useContext(UserContext);

    const Tabs = () => (
        <Tab.Navigator screenOptions={{
            // header: ({ navigation, route, options }) => {
            //     const title = getHeaderTitle(options, route.name);
            //
            //     return(
            //         <SafeAreaView>
            //             <View style={{
            //                 flexDirection: "row",
            //                 justifyContent: "space-between",
            //                 paddingVertical: 8,
            //                 paddingHorizontal: 12,
            //             }}>
            //                 <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            //                     <Ionicons name="md-menu-sharp" size={24} color="black" />
            //                 </TouchableOpacity>
            //                 <Text style={{
            //                     fontSize: 16,
            //                     fontWeight: "bold",
            //                 }}>{title}</Text>
            //                 <View />
            //             </View>
            //         </SafeAreaView>
            //     );
            // },
            tabBarStyle: {
                // paddingVertical: 64,
            },
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
    <UserContextProvider>
        <NavigationContainer theme={theme}>
            <App />
        </NavigationContainer>
    </UserContextProvider>
)
