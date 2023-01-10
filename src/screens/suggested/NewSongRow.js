import { View, StyleSheet, Image, Text } from "react-native";
import { COLORS } from "constants/theme";
import { windowWidth } from "constants/theme";

export default NewSongRow = ({ image, title, artist }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={image}></Image>
      <View style={styles.containerTitle}>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <Text
          numberOfLines={1}
          style={[styles.title, { fontSize: 10, color: COLORS.title }]}
        >
          {artist}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 7,
  },
  containerTitle: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    backgroundColor: "#D6E4E5",
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
  title: {
    paddingLeft: 5,
    paddingRight: 5,
    color: COLORS.black,
    width: windowWidth / 4 + 13,
    fontSize: 11,
    fontWeight: "500",
    marginLeft: 2,
  },
  image: {
    height: 60,
    width: 60,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
});
