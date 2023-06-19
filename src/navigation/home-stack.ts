import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlaylistPage from "screens/playlist/playlist-page";
import HomePage from "screens/home/home-page";
import DetailLibraryPage from "screens/library/detail-library-page";

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
      <Stack.Screen
        name="DetailLibraryPage"
        component={DetailLibraryPage}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
