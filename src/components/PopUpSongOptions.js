import { View, StyleSheet, Text, TouchableHighlight } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Popover from "react-native-popover-view";
import { useNavigation } from "@react-navigation/native";
import PlayerController from "helper/PlayerController";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { COLORS } from "constants/theme";
import { removeASongWithDocId } from "api/LibraryAPI";
import {
  setNavToDetailId,
  setRefreshLibrary,
  setShowBottomPlay,
} from "redux/slices/playerSlide";
import { showToastAndroid } from "helper";

export default function PopUpSongOptions({
  currSongRow,
  showPopover,
  setShowPopover,
}) {
  const { lovedSongId, activeSong, currLovedSong, activeLibraryId } =
    useSelector((state) => state.player);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isEmpty = Object.keys(activeSong).length === 0;

  const getLovedStatus = (songid) => {
    if (currLovedSong) {
      const listLovedSongID = currLovedSong.map((e) => e.id);

      return listLovedSongID.includes(songid);
    }
  };

  const handleLovedSong = async () => {
    await PlayerController.onLovedSong([
      lovedSongId,
      currSongRow,
      currLovedSong,
    ]);

    setShowPopover(false);

    if (activeLibraryId?.id === lovedSongId) {
      navToDetail();
    }
  };

  const navToDetail = () => {
    navigation.navigate("Library");

    dispatch(setRefreshLibrary(true));
    dispatch(setNavToDetailId(activeLibraryId.id));

    if (!isEmpty) {
      dispatch(setShowBottomPlay(true));
    }
  };

  const deleteASong = async () => {
    await removeASongWithDocId(
      currSongRow.id,
      activeLibraryId.id,
      activeLibraryId.songs
    );

    showToastAndroid("Đã xoá khỏi " + activeLibraryId.title);

    navToDetail();
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
        {!activeLibraryId && (
          <TouchableHighlight
            underlayColor={COLORS.songRowClickColor}
            onPress={handleAddToLibrary}
          >
            <View style={styles.popupRow}>
              <MaterialIcons
                name="playlist-add"
                color={COLORS.black}
                size={35}
              />
              <Text style={styles.popupText}>Thêm vào thư viện</Text>
            </View>
          </TouchableHighlight>
        )}
        <TouchableHighlight
          underlayColor={COLORS.songRowClickColor}
          onPress={handleLovedSong}
        >
          <View style={styles.popupRow}>
            <FontAwesome
              name={getLovedStatus(currSongRow.id) ? "heart" : "heart-o"}
              color={COLORS.primary}
              size={25}
              solid
            />
            <Text style={[styles.popupText, { marginLeft: 15 }]}>
              {getLovedStatus(currSongRow.id) ? "Đã thích" : "Thích"}
            </Text>
          </View>
        </TouchableHighlight>
        {activeLibraryId && activeLibraryId.id !== lovedSongId && (
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
                Xoá khỏi {activeLibraryId.title}
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
