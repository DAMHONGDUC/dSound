import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabStack from "./BottomTabStack";
import PlayMusicPage from "screens/playmusic/PlayMusicPage";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabStack"
        component={BottomTabStack}
        options={{
          headerShadowVisible: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PlayMusicPage"
        component={PlayMusicPage}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
