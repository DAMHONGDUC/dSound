import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  Text,
  TouchableHighlight,
} from "react-native";
import { COLORS } from "constants/theme";
import { useDispatch, useSelector } from "react-redux";
import { setShowBottomPlay } from "redux/slices/playerSlide";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import Popover from "react-native-popover-view";
import { useState } from "react";
import PlayerController from "helper/PlayerController";
import PopUpSongOptions from "components/PopUpSongOptions";

export default function HeaderSection() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [showPopover, setShowPopover] = useState(false);
  const { lovedSongId, activeSong, currLovedSong } = useSelector(
    (state) => state.player
  );

  const handleBackButton = () => {
    navigation.pop();
    dispatch(setShowBottomPlay(true));
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        dispatch(setShowBottomPlay(true));
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [])
  );

  // const getLovedStatus = (songid) => {
  //   if (currLovedSong) {
  //     const listLovedSongID = currLovedSong.map((e) => e.id);

  //     return listLovedSongID.includes(songid);
  //   }
  // };

  // const handleLovedSong = async () => {
  //   await PlayerController.onLovedSong([
  //     lovedSongId,
  //     activeSong,
  //     currLovedSong,
  //   ]);
  // };

  // const handleAddToLibrary = () => {
  //   setShowPopover(false);
  //   navigation.navigate("AddToLibrary");
  // };

  return (
    <View style={styles.row}>
      <View style={styles.view}>
        <TouchableOpacity>
          <MaterialIcons
            onPress={handleBackButton}
            name="expand-more"
            color={COLORS.black}
            size={35}
          />
        </TouchableOpacity>
      </View>
      <PopUpSongOptions
        showPopover={showPopover}
        setShowPopover={setShowPopover}
      />

      {/* <Popover
        isVisible={showPopover}
        onRequestClose={() => setShowPopover(false)}
      >
        <View style={styles.popupContainer}>
          <TouchableHighlight
            underlayColor={COLORS.songRowClickColor}
            onPress={handleAddToLibrary}
          >
            <View style={styles.popupRow}>
              <MaterialIcons
                onPress={handleBackButton}
                name="playlist-add"
                color={COLORS.black}
                size={35}
              />
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
        </View>
      </Popover> */}
      <View style={styles.view}>
        <TouchableOpacity onPress={() => setShowPopover(true)}>
          <Feather name={"more-vertical"} color={COLORS.black} size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  view: {
    width: 60,
    height: 60,
    //backgroundColor: COLORS.yellow,
    alignItems: "center",
    justifyContent: "center",
  },
  popupContainer: {
    flexDirection: "column",
    height: 130,
    width: 230,
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
