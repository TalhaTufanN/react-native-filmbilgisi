import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import React from 'react'
import MovieScreen from '../screens/MovieScreen'
import PersonScreen from '../screens/PersonScreen'

const Stack = createStackNavigator()
export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{headerShown:false}} component={HomeScreen} />
        <Stack.Screen name="Movie" options={{headerShown:false}} component={MovieScreen} />
        <Stack.Screen name="Person" options={{headerShown:false}} component={PersonScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})