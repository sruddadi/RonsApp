import React, { useEffect } from "react";
import { Alert } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

// Screens
import HomeScreen from "./guestMenu";
import DummyScreen from "./dummy";
import GuestSettingsScreen from "./guestSetting";

// Screen names
const homeName = "Home";
const videoName = "Video";
const favoriteName = "Favorite";
const settingsName = "Setting";

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  const UID = 1234567;
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarStyle: { height: Platform.OS === "ios" ? 100 : 70 },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "grey",
        tabBarLabelStyle: { paddingBottom: 10, fontSize: 12 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === videoName) {
            iconName = focused ? "play" : "play-outline";
          } else if (rn === favoriteName) {
            iconName = focused ? "star" : "star-outline";
          } else if (rn === settingsName) {
            iconName = focused ? "settings" : "settings-outline";
          }

          return (
            <Ionicons
              name={iconName}
              size={30}
              color={color}
              style={{ padding: 10, height: 70, marginTop: 30 }}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name={homeName}
        component={HomeScreen}
        options={{ headerShown: false, unmountOnBlur: true }}
        initialParams={{ UID: UID }}
      />
      <Tab.Screen
        name={videoName}
        component={DummyScreen}
        options={{ headerShown: false, unmountOnBlur: true }}
        initialParams={{ UID: UID }}
      />
      <Tab.Screen
        name={favoriteName}
        component={DummyScreen}
        options={{ headerShown: false, unmountOnBlur: true }}
        initialParams={{ UID: UID }}
      />
      <Tab.Screen
        name={settingsName}
        component={GuestSettingsScreen}
        options={{ headerShown: false, unmountOnBlur: true }}
        initialParams={{ UID: UID }}
      />
    </Tab.Navigator>
  );
};

export default MainScreen;
