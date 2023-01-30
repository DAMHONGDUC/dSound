import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserDetailPage from "screens/user/UserDetailPage";
import Foundation from "react-native-vector-icons/Foundation";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { COLORS } from "constants/theme";
import SearchPage from "screens/search/searchPage";
import HomeStack from "./HomeStack";
import MainHeader from "components/MainHeader";

const BottomTab = createBottomTabNavigator();

export default function BottomTabStack() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 55,
          elevation: 0,
          backgroundColor: COLORS.tabBarColor,
        },
        tabBarItemStyle: { paddingVertical: 5 },
      }}
    >
      <BottomTab.Screen
        name="HomeStack"
        component={HomeStack}
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
        name="User"
        component={UserDetailPage}
        options={{
          headerShown: false,
          tabBarLabel: "User",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name={"user"} color={color} size={size - 2} solid />
          ),
          tabBarActiveTintColor: COLORS.primary,
        }}
      />
    </BottomTab.Navigator>
  );
}
