import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from './src/screens/Onboarding';
import {NavigationContainer} from "@react-navigation/native";

const OnboardingStack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <OnboardingStack.Navigator>
        <OnboardingStack.Screen name={'onboarding'} component={Onboarding} options={{
          headerShown: false,
        }}/>
      </OnboardingStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
