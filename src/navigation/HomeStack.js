import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlaylistPage from "screens/playlist/PlaylistPage";
import HomePage from "screens/home/HomePage";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PlaylistPage"
        component={PlaylistPage}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
