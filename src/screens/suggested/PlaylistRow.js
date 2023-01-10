import { View, StyleSheet, Image, Text } from "react-native";
import { COLORS } from "constants/theme";

export default PlaylistRow = ({ title, image, des, onClick }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={image}></Image>
      <View>
        <Text numberOfLines={2} style={styles.title}>
          {title}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: COLORS.white,
    marginRight: 10,
  },
  containerTitle: {
    flexDirection: "column",
    backgroundColor: COLORS.white,
  },
  title: {
    color: COLORS.black,
    maxWidth: 130,
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 2,
  },
  image: {
    height: 140,
    width: 140,
    borderRadius: 15,
  },
});
