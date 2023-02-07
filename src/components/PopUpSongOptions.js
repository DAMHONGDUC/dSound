import {
  View,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  Text,
  TouchableHighlight,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Popover from "react-native-popover-view";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import PlayerController from "helper/PlayerController";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { COLORS } from "constants/theme";
import { removeASongWithDocId } from "api/LibraryAPI";
import { setNavToDetailId, setRefreshLibrary } from "redux/slices/playerSlide";

export default function PopUpSongOptions({
  currSongRowId,
  showPopover,
  setShowPopover,
}) {
  const { lovedSongId, activeSong, currLovedSong, activeLibraryId } =
    useSelector((state) => state.player);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const getLovedStatus = (songid) => {
    if (currLovedSong) {
      const listLovedSongID = currLovedSong.map((e) => e.id);

      return listLovedSongID.includes(songid);
    }
  };

  const handleLovedSong = async () => {
    await PlayerController.onLovedSong([
      lovedSongId,
      activeSong,
      currLovedSong,
    ]);

    setShowPopover(false);
  };

  const deleteASong = async () => {
    await removeASongWithDocId(
      currSongRowId,
      activeLibraryId.id,
      activeLibraryId.songs
    );

    navigation.navigate("Library");
    dispatch(setRefreshLibrary(true));
    dispatch(setNavToDetailId(activeLibraryId.id));
  };

  const handleAddToLibrary = () => {
    setShowPopover(false);
    navigation.navigate("AddToLibrary");
  };
  return (
    <Popover
      isVisible={showPopover}
      onRequestClose={() => setShowPopover(false)}
    >
      <View style={styles.popupContainer}>
        <TouchableHighlight
          underlayColor={COLORS.songRowClickColor}
          onPress={handleAddToLibrary}
        >
          <View style={styles.popupRow}>
            <MaterialIcons name="playlist-add" color={COLORS.black} size={35} />
            <Text style={styles.popupText}>Thêm vào thư viện</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={COLORS.songRowClickColor}
          onPress={handleLovedSong}
        >
          <View style={styles.popupRow}>
            <FontAwesome
              name={getLovedStatus(activeSong.id) ? "heart" : "heart-o"}
              color={COLORS.primary}
              size={25}
              solid
            />
            <Text style={[styles.popupText, { marginLeft: 15 }]}>
              {getLovedStatus(activeSong.id) ? "Đã thích" : "Thích"}
            </Text>
          </View>
        </TouchableHighlight>
        {activeLibraryId && (
          <TouchableHighlight
            underlayColor={COLORS.songRowClickColor}
            onPress={deleteASong}
          >
            <View style={styles.popupRow}>
              <FontAwesome
                name={"remove"}
                color={COLORS.primary}
                size={29}
                solid
              />
              <Text style={[styles.popupText, { marginLeft: 15 }]}>
                Xoá khỏi Playlist này
              </Text>
            </View>
          </TouchableHighlight>
        )}
      </View>
    </Popover>
  );
}

const styles = StyleSheet.create({
  popupContainer: {
    flexDirection: "column",
    height: 150,
    width: 300,
    justifyContent: "space-evenly",
  },
  popupRow: {
    flexDirection: "row",
    // marginTop: 10,
    marginLeft: 15,
    alignItems: "center",
  },
  popupText: {
    marginLeft: 5,
    color: COLORS.black,
    fontSize: 18,
  },
});
