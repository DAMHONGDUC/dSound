import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setNavToDetailId,
  setRefreshLibrary,
  setShowBottomPlay,
} from "redux/slices/playerSlide";
import { useNavigation } from "@react-navigation/native";
import LibraryComponent from "./LibraryComponent";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import { COLORS } from "constants/theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getPlaylistByUid } from "api/LibraryAPI";
import { useState } from "react";
import { addSongWithDocId, getAllSongByDocId } from "api/LibraryAPI";
import { showToastAndroid } from "helper";

export default function LibraryPage() {
  const navigation = useNavigation();
  const { refreshLibrary, uid, lovedSongId, activeSong } = useSelector(
    (state) => state.player
  );
  const dispatch = useDispatch();
  const [dataPlaylist, setDataPlaylist] = useState();

  useEffect(() => {
    dispatch(setRefreshLibrary(true));
  }, []);

  const fetchData = async () => {
    setDataPlaylist(null);

    const res = await getPlaylistByUid(uid);
    const data = res.filter((e) => e.id !== lovedSongId);

    setDataPlaylist(data);
    dispatch(setRefreshLibrary(false));
  };

  useEffect(() => {
    if (refreshLibrary && uid) {
      fetchData();
    }
  }, [refreshLibrary, uid]);

  const onPress = async (item) => {
    await addSongWithDocId(activeSong, item.id);
    showToastAndroid("Đã thêm vào " + item.title);

    await navToDetail(item);

    dispatch(setRefreshLibrary(true));
  };

  const navToDetail = async ({ id, image, title, numOfSong }) => {
    dispatch(setNavToDetailId(id));
    dispatch(setShowBottomPlay(true));

    navigation.navigate("BottomTabStack", {
      screen: "Library",
    });
  };

  const handleBackButton = () => {
    navigation.pop();
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight
        underlayColor={COLORS.white}
        onPress={handleBackButton}
      >
        <View style={styles.backButton}>
          <Ionicons name="arrow-back" color={COLORS.black} size={25} />
        </View>
      </TouchableHighlight>

      <LibraryComponent dataPlaylist={dataPlaylist} onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  backButton: {
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
