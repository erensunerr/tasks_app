import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from './src/screens/Onboarding';
import {NavigationContainer} from "@react-navigation/native";
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";

const OnboardingStack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <OnboardingStack.Navigator screenOptions={{
        headerShown: false
      }}>
          <OnboardingStack.Screen name={'onboarding'} component={Onboarding} />
          <OnboardingStack.Screen name={'signup'} component={Signup}  />
          <OnboardingStack.Screen name={'login'} component={Login} />
      </OnboardingStack.Navigator>
    </NavigationContainer>
  );
}
