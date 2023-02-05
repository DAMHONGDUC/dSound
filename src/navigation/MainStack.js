import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabStack from "./BottomTabStack";
import PlayMusicPage from "screens/playmusic/PlayMusicPage";
import { firebase } from "@react-native-firebase/auth";
import { useDispatch } from "react-redux";
import { setUid } from "redux/slices/playerSlide";
import { useEffect } from "react";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  const dispatch = useDispatch();

  useEffect(() => {
    const res = firebase.auth().currentUser;

    if (res?.uid) {
      dispatch(setUid(res.uid));
    }
  }, []);

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
