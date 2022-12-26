import { Text, View, StyleSheet } from "react-native";
import { COLORS } from "constants/theme";

export default LyricSection = () => {
  return (
    <View style={styles.lyricSection}>
      <Text style={styles.lyricTitle}>Lyric</Text>
      <Text style={styles.lyricText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  lyricSection: {
    backgroundColor: "#fff4e4",
    padding: 10,
    marginTop: 10,
  },
  lyricText: {
    color: COLORS.black,
    lineHeight: 30,
    fontSize: 20,
  },
  lyricTitle: {
    color: COLORS.black,
    color: COLORS.black,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
