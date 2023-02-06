import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableHighlight,
} from "react-native";
import { COLORS } from "constants/theme";

export default function LibraryPlaylistRow({
  onPress,
  title,
  image,
  numOfSong,
  id,
}) {
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
