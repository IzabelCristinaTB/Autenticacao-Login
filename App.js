import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from './src/components/screens/HomeScreen';
import { ProfileScreen } from './src/components/screens/ProfileScreen';
import { SignUpScreen } from './src/components/screens/signUp';
import { SignInScreen } from './src/components/screens/SignIn';

import { initializeApp } from 'firebase/app';

const Stack = createStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyDczh-dXCNlBIW00Yjvi4pZAOWpEUB-u6M",
  authDomain: "firabase-auth-f03dd.firebaseapp.com",
  projectId: "firabase-auth-f03dd",
  storageBucket: "firabase-auth-f03dd.appspot.com",
  messagingSenderId: "862118169832",
  appId: "1:862118169832:web:0a5449217990e4a3dbcd5d"

};

const firebaseApp = initializeApp(firebaseConfig);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name='Home' component={HomeScreen} />
        <Stack.Screen options={{ headerShown: false }} name='Profile' component={ProfileScreen} />
        <Stack.Screen options={{ headerShown: false }} name='SignUp' component={SignUpScreen} />
        <Stack.Screen options={{ headerShown: false }} name='SignIn' component={SignInScreen} />
      </Stack.Navigator>
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
