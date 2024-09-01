import { StatusBar, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../SplashScreen';
import LoginScreen from '../auth/LoginScreen';
import RegistrationScreen from '../auth/RegisterScreen';
import DashboardScreen from '../Home/DashboardScreen';
import WakeUpTimeScreen from '../Questions/WakeUpTimeScreen';
import BedTimeScreen from '../Questions/BedTimeScreen';
import DailyIntakeScreen from '../Questions/DailyIntakeScreen';

const Stack = createStackNavigator();
export default function StackNavigation() {
  return (
    <NavigationContainer>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content" // Adjust this based on your preferred style
        />
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="RegisterScreen" component={RegistrationScreen} options={{ headerShown: false }} />
          <Stack.Screen name="DashboardScreen" component={DashboardScreen} options={{ headerShown: false }} />
          <Stack.Screen name="WakeUpTimeScreen" component={WakeUpTimeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="BedTimeScreen" component={BedTimeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="DailyIntakeScreen" component={DailyIntakeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="WeightInputScreen" component={WeightInputScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
  )
}

const styles = StyleSheet.create({})