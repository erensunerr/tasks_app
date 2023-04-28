import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";


import Onboarding from './src/screens/auth/Onboarding';
import Login from "./src/screens/auth/Login";
import Signup from "./src/screens/auth/Signup";
import UserContext, {UserContextProvider} from "./src/components/UserContext";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Demo from "./src/screens/app/Demo";
import {useContext} from "react";


const OnboardingStack = createNativeStackNavigator();

function App() {
    const {user, loading} = useContext(UserContext);
    return (
        <OnboardingStack.Navigator screenOptions={{
          header: () => (<StatusBar style="dark" />),
          gestureEnabled: false,
        }}>
            {
                user ?
                <OnboardingStack.Screen name={'demo'} component={Demo} />
                :
                <>
                    <OnboardingStack.Screen name={'onboarding'} component={Onboarding} />
                    <OnboardingStack.Screen name={'signup'} component={Signup}  />
                    <OnboardingStack.Screen name={'login'} component={Login} />
                </>
            }
        </OnboardingStack.Navigator>
    );
}

// Wrap app with the necessary contexts before exporting.

export default () => (
    <UserContextProvider>
        <NavigationContainer>
            <App />
        </NavigationContainer>
    </UserContextProvider>
)
