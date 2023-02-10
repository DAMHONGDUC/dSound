import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setRefreshLibrary, setShowBottomPlay } from "redux/slices/playerSlide";
import { useNavigation, useRoute } from "@react-navigation/native";
import LibraryComponent from "./LibraryComponent";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import { COLORS } from "constants/theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getPlaylistByUid } from "api/LibraryAPI";
import { useState } from "react";
import { addSongWithDocId } from "api/LibraryAPI";
import { showToastAndroid } from "helper";

export default function LibraryPage() {
  const navigation = useNavigation();
  const { refreshLibrary, uid, lovedSongId } = useSelector(
    (state) => state.player
  );
  const dispatch = useDispatch();
  const [dataPlaylist, setDataPlaylist] = useState();
  const route = useRoute();

  useEffect(() => {
    dispatch(setRefreshLibrary(true));

    dispatch(setShowBottomPlay(false));
  }, []);

  const fetchData = async () => {
    setDataPlaylist(null);

    const playlist = await getPlaylistByUid(uid);
    const data = playlist.filter((e) => e.id !== lovedSongId);

    setDataPlaylist(data);
    dispatch(setRefreshLibrary(false));
  };

  useEffect(() => {
    if (refreshLibrary && uid) {
      fetchData();
    }
  }, [refreshLibrary, uid]);

  const onPress = async (item) => {
    const currSongRow = route.params.currSongRow;

    await addSongWithDocId(currSongRow, item.id);

    handleBackButton();

    showToastAndroid("Đã thêm vào " + item.title);

    dispatch(setRefreshLibrary(true));
  };

  const handleBackButton = () => {
    dispatch(setShowBottomPlay(true));
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
