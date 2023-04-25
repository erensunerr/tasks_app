import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";


import Onboarding from './src/screens/auth/Onboarding';
import Login from "./src/screens/auth/Login";
import Signup from "./src/screens/auth/Signup";
import UserContext from "./src/components/UserContext";


const OnboardingStack = createNativeStackNavigator();
export default function App() {
    return (
    <NavigationContainer>
        <UserContext>
            <OnboardingStack.Navigator screenOptions={{
              header: () => (<StatusBar style="dark" />),
              gestureEnabled: false,
            }}>
              <OnboardingStack.Screen name={'onboarding'} component={Onboarding} />
              <OnboardingStack.Screen name={'signup'} component={Signup}  />
              <OnboardingStack.Screen name={'login'} component={Login} />
            </OnboardingStack.Navigator>
        </UserContext>
    </NavigationContainer>
    );
}
