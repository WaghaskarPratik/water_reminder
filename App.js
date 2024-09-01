import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/Screens/SplashScreen';
import LoginScreen from './src/Screens/auth/LoginScreen';
import RegisterScreen from './src/Screens/auth/RegisterScreen';
import DashboardScreen from './src/Screens/Home/DashboardScreen';
import WakeUpTimeScreen from './src/Screens/Questions/WakeUpTimeScreen';
import BedTimeScreen from './src/Screens/Questions/BedTimeScreen';
import DailyIntakeScreen from './src/Screens/Questions/DailyIntakeScreen';
import WeightInputScreen from './src/Screens/Questions/WeightInputScreen';

const Stack = createStackNavigator();

import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux'
import rootReducer from './src/Redux/Reducer.js';
import WelcomeScreen from './src/Screens/WelcomeScreen.js';

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content" // Adjust this based on your preferred style
        />
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="DashboardScreen" component={DashboardScreen} options={{ headerShown: false }} />
          <Stack.Screen name="WakeUpTimeScreen" component={WakeUpTimeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="BedTimeScreen" component={BedTimeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="DailyIntakeScreen" component={DailyIntakeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="WeightInputScreen" component={WeightInputScreen} options={{ headerShown: false }} />
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({

})