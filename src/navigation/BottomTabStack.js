import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "screens/home/HomePage";
import LibraryPage from "screens/library/LibraryPage";
import Foundation from "react-native-vector-icons/Foundation";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { COLORS } from "constants/theme";
import TopTabStack from "./TopTabStack";
import SearchPage from "screens/search/searchPage";

const BottomTab = createBottomTabNavigator();

export default function BottomTabStack() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 55,
        },
        tabBarItemStyle: { paddingVertical: 5 },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomePage}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Foundation name={"home"} color={color} size={size + 2} solid />
          ),
          tabBarActiveTintColor: COLORS.primary,
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchPage}
        options={{
          headerShown: false,
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name={"search1"} color={color} size={size - 1} solid />
          ),
          tabBarActiveTintColor: COLORS.primary,
        }}
      />
      <BottomTab.Screen
        name="Library"
        component={LibraryPage}
        options={{
          headerShown: false,
          tabBarLabel: "Library",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name={"folder"} color={color} size={size - 2} solid />
          ),
          tabBarActiveTintColor: COLORS.primary,
        }}
      />
    </BottomTab.Navigator>
  );
}
