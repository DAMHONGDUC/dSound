import { Text, View, StyleSheet } from "react-native";
import { COLORS } from "constants/theme";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getLyric } from "api/SongAPI";

export default LyricSection = () => {
  const activeSong = useSelector((state) => state.player.activeSong);
  const [lyric, setLyric] = useState("");

  useEffect(() => {
    // const fetchLyric = async () => {
    //   const data = await getLyric(activeSong.id);
    //   setLyric(data);
    // };

    // fetchLyric();
    setLyric(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    );
  }, []);

  return (
    <View style={styles.lyricSection}>
      <Text style={styles.lyricTitle}>Lyric</Text>
      <Text style={styles.lyricText}>{lyric}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  lyricSection: {
    backgroundColor: "#fff4e4",
    padding: 13,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
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
