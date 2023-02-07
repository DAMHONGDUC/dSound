import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "constants/theme";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setNavToDetailId, setRefreshLibrary } from "redux/slices/playerSlide";
import AntDesign from "react-native-vector-icons/AntDesign";
import { removeWithDocId } from "api/LibraryAPI";
import { FAVORITE_PLAYLIST_COLLECTION } from "constants/values";
import { showToastAndroid } from "helper";
import { Alert } from "react-native";

export default function LibraryPlaylistRow({
  onPress,
  title,
  image,
  numOfSong,
  id,
}) {
  const { navToDetailId, lovedSongId } = useSelector((state) => state.player);
  const dispatch = useDispatch();

  const handleOnPress = () => {
    onPress({ title, image, numOfSong, id });
  };

  useEffect(() => {
    if (navToDetailId && id === navToDetailId) {
      handleOnPress();

      dispatch(setNavToDetailId(""));
    }
  }, [navToDetailId]);

  const handleDeletePlaylist = async () => {
    await removeWithDocId(FAVORITE_PLAYLIST_COLLECTION, id);

    showToastAndroid("Đã xoá playlist: " + title);

    dispatch(setRefreshLibrary(true));
  };

  const showDeleteAlert = () => {
    Alert.alert("Thông báo", "Bạn có chắc chắn muốn xoá playlist này?", [
      {
        text: "Cancel",
        onPress: () => {},
      },
      {
        text: "Ok",
        onPress: handleDeletePlaylist,
      },
    ]);
  };

  return (
    <TouchableHighlight
      underlayColor={COLORS.songRowClickColor}
      style={styles.container}
      onPress={handleOnPress}
    >
      <View style={styles.row}>
        <Image style={styles.image} source={image} />
        <View style={styles.column}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
          <Text numberOfLines={1} style={styles.subTitle}>
            {numOfSong} bài hát
          </Text>
        </View>
        {id !== lovedSongId && (
          <TouchableOpacity style={styles.moreOption} onPress={showDeleteAlert}>
            <AntDesign name={"delete"} color={COLORS.black} size={22} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: COLORS.white,
    marginRight: 10,
    borderRadius: 15,
    marginBottom: 20,
  },
  containerTitle: {
    flexDirection: "column",
    backgroundColor: COLORS.white,
  },
  title: {
    color: COLORS.black,
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 5,
  },
  subTitle: {
    color: COLORS.title,
    fontSize: 13,
    fontWeight: "500",
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 13,
  },
  row: {
    flexDirection: "row",
  },
  column: {
    marginLeft: 10,
    flexDirection: "column",
    justifyContent: "center",
  },
  moreOption: {
    position: "absolute",
    right: 0,
    alignSelf: "center",
  },
});
