import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeFeed from "../screens/HomeFeed";
import CreatePost from "../screens/CreatePost";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeFeed} />
      <Tab.Screen name="Create" component={CreatePost} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
