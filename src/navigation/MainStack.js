import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabStack from "./BottomTabStack";
import MainHeader from "components/MainHeader";
import PlayMusicPage from "screens/playmusic/PlayMusicPage";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  const { showMainHeader } = useSelector((state) => state.player);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabStack"
        component={BottomTabStack}
        options={{
          headerTitle: () => <MainHeader />,
          headerShadowVisible: false,
          headerShown: showMainHeader,
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
