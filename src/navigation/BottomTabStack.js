import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "screens/home/HomePage";
import FavoritePage from "screens/favorite/FavoritePage";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const BottomTab = createBottomTabNavigator();

export default function BottomTabStack() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Home"
        component={HomePage}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name={"home"} color={color} size={size} solid />
          ),
        }}
      />
      <BottomTab.Screen
        name="Favorite"
        component={FavoritePage}
        options={{ headerShown: false }}
      />
    </BottomTab.Navigator>
  );
}
