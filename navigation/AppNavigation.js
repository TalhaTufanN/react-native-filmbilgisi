import { StyleSheet, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import React from "react";
import MovieScreen from "../screens/MovieScreen";
import PersonScreen from "../screens/PersonScreen";
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";
import FavouritesScreen from "../screens/FavouritesScreen";
import CustomDrawerContent from "./CustomDrawerContent";
import SettingsScreen from "../screens/SettingsScreen";
import SeeAllScreen from "../screens/SeeAllScreen";
import {
  HomeIcon,
  UserIcon,
  StarIcon,
  Cog6ToothIcon,
} from "react-native-heroicons/outline";
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        options={{ headerShown: false }}
        component={HomeScreen}
      />
      <Stack.Screen
        name="Movie"
        options={{ headerShown: false }}
        component={MovieScreen}
      />
      <Stack.Screen
        name="Person"
        options={{ headerShown: false }}
        component={PersonScreen}
      />
      <Stack.Screen
        name="Search"
        options={{ headerShown: false }}
        component={SearchScreen}
      />
      <Stack.Screen
        name="SeeAll"
        options={{ headerShown: false }}
        component={SeeAllScreen}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerActiveTintColor: "white",
          drawerInactiveTintColor: "gray",
          drawerType: "slide",
          drawerStyle: {
            backgroundColor: "#111",
          },
          drawerLabelStyle: {
            fontSize: 16,
          },
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="Ana Sayfa"
          component={StackNavigator}
          options={{
            headerShown: false,
            drawerIcon: ({ color, size }) => (
              <HomeIcon size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Profil"
          component={ProfileScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <UserIcon size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Favorilerim"
          component={FavouritesScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <StarIcon size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Ayarlar"
          component={SettingsScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Cog6ToothIcon size={size} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
