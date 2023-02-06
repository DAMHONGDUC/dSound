import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabStack from "./BottomTabStack";
import PlayMusicPage from "screens/playmusic/PlayMusicPage";
import { firebase } from "@react-native-firebase/auth";
import { useDispatch } from "react-redux";
import { setUid, setLovedSongId } from "redux/slices/playerSlide";
import { useEffect } from "react";
import { createNewPlaylist } from "api/LibraryAPI";
import { LOVED_SONG_PLAYLIST } from "constants/values";
import AddToLibrary from "screens/library/AddToLibrary";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  const dispatch = useDispatch();

  const setUpUser = async () => {
    const res = firebase.auth().currentUser;

    if (res?.uid) {
      const playlistID = res.uid + "loved_song";

      dispatch(setUid(res.uid));
      dispatch(setLovedSongId(playlistID));

      await createNewPlaylist(
        playlistID,
        "Bài hát đã thích",
        res.uid,
        LOVED_SONG_PLAYLIST
      );
    }
  };

  useEffect(() => {
    setUpUser();
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
      <Stack.Screen
        name="AddToLibrary"
        component={AddToLibrary}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
