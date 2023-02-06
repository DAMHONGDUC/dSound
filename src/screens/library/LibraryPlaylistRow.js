import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableHighlight,
} from "react-native";
import { COLORS } from "constants/theme";
import { useNavigation } from "@react-navigation/native";
import { LIBRARY_FLOW } from "constants/values";
import { useSelector } from "react-redux";
import { getAllSongByDocId } from "api/LibraryAPI";

export default function LibraryPlaylistRow({ title, image, numOfSong, id }) {
  const navigation = useNavigation();
  const { lovedSongId, currLovedSong } = useSelector((state) => state.player);

  const onPress = async () => {
    const data =
      lovedSongId === id ? currLovedSong : await getAllSongByDocId(id).songs;

    navigation.navigate("PlaylistPage", {
      id: id,
      type: LIBRARY_FLOW,
      props: {
        image: image,
        title: title,
        numOfSong: numOfSong,
        songs: data,
      },
    });
  };

  return (
    <TouchableHighlight
      underlayColor={COLORS.songRowClickColor}
      style={styles.container}
      onPress={onPress}
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
});
