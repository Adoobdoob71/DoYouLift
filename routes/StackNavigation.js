import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomNavigation from "./BottomNavigation";
import Post from "../screens/Post";
import { SafeAreaView } from "react-native";
import Register from "../screens/Register";
import Login from "../screens/Login";
import AddPost from "../screens/AddPost";
import { theme } from "../Theme";
import AddComment from "../screens/AddComment";

const Stack = createStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="BottomNavigation"
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.surface },
      }}>
      <Stack.Screen
        component={BottomNavigation}
        name="BottomNavigation"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={Post}
        name="Post"
        options={{ headerShown: false }}
      />
      <Stack.Screen component={Register} name="Register" />
      <Stack.Screen component={Login} name="Login" />
      <Stack.Screen component={AddPost} name="AddPost" />
      <Stack.Screen component={AddComment} name="AddComment" />
    </Stack.Navigator>
  );
}
