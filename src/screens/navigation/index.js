import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../splash';
import LoginScreen from '../login';
import CreateAccountScreen from '../createAccount';
import Toast from 'react-native-toast-message';
import HomeScreen from '../home';
import ForgotPasswordScreen from '../forgotPassword';

const Stack = createNativeStackNavigator();

export default function NavigationScreen() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen
            name="CreateAccountScreen"
            component={CreateAccountScreen}
          />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast position="top" topOffset={50} visibilityTime={2000} />
    </>
  );
}
