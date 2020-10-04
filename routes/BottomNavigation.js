import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "../screens/Home";
import People from "../screens/People";
import { useTheme } from "@react-navigation/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { LightTheme, theme } from "../Theme";
import { LinearGradient } from "expo-linear-gradient";
import Workouts from "../screens/Workouts";
import Leaderboards from "../screens/Leaderboards";

const Tab = createMaterialBottomTabNavigator();

export default function BottomNavigation(props) {
  const colors = theme.colors;
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={colors.primary}
      shifting={true}
      barStyle={{ backgroundColor: colors.surface }}>
      <Tab.Screen
        component={Home}
        name="Home"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <LinearGradient
              colors={[theme.colors.accent, theme.colors.primary]}
              start={[1, 1]}
              end={[0, 1]}
              style={{ borderRadius: 8, padding: 4 }}>
              <MaterialCommunityIcons
                name="home"
                size={16}
                style={{ alignSelf: "center" }}
                color="#ffffff"
              />
            </LinearGradient>
          ),
        }}
      />
      <Tab.Screen
        component={People}
        name="People"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <LinearGradient
              colors={[theme.colors.accent, theme.colors.primary]}
              start={[1, 1]}
              end={[0, 1]}
              style={{ borderRadius: 8, padding: 4 }}>
              <MaterialCommunityIcons
                name={focused ? "account-multiple" : "account-multiple-outline"}
                size={16}
                style={{ alignSelf: "center" }}
                color="#ffffff"
              />
            </LinearGradient>
          ),
        }}
      />
      <Tab.Screen
        component={Workouts}
        name="Workouts"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <LinearGradient
              colors={[theme.colors.accent, theme.colors.primary]}
              start={[1, 1]}
              end={[0, 1]}
              style={{ borderRadius: 8, padding: 4 }}>
              <MaterialCommunityIcons
                name={focused ? "run-fast" : "run"}
                size={16}
                style={{ alignSelf: "center" }}
                color="#ffffff"
              />
            </LinearGradient>
          ),
        }}
      />
      <Tab.Screen
        component={Leaderboards}
        name="Leaderboards"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <LinearGradient
              colors={[theme.colors.accent, theme.colors.primary]}
              start={[1, 1]}
              end={[0, 1]}
              style={{ borderRadius: 8, padding: 4 }}>
              <MaterialCommunityIcons
                name="medal"
                size={16}
                style={{ alignSelf: "center" }}
                color="#ffffff"
              />
            </LinearGradient>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
