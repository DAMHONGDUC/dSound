import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabStack from "./BottomTabStack";
import PlayMusicPage from "screens/playmusic/play-music-page";
import { firebase } from "@react-native-firebase/auth";
import { useDispatch } from "react-redux";
import { setUid, setLovedSongId } from "stores/player/player-store";
import { useEffect } from "react";
import { createNewPlaylist } from "api/LibraryAPI";
import { LOVED_SONG_PLAYLIST } from "constants/values";
import AddToLibrary from "screens/library/add-to-library";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  const dispatch = useDispatch();

  const setUpUser = async () => {
    const currentUser = firebase.auth().currentUser;

    if (currentUser?.uid) {
      const playlistID = currentUser.uid + "loved_song";

      dispatch(setUid(currentUser.uid));
      dispatch(setLovedSongId(playlistID));

      await createNewPlaylist(
        playlistID,
        "Bài hát đã thích",
        currentUser.uid,
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
