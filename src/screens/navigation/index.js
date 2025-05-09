import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../splash';
import LoginScreen from '../login';
import CreateAccountScreen from '../createAccount';

const Stack = createNativeStackNavigator();

export default function NavigationScreen() {
  return (
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
