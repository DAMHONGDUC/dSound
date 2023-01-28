import { Text, View, StyleSheet, ScrollView } from "react-native";
import { COLORS } from "constants/theme";
import { createRef, useEffect, useState } from "react";
import { getLyric } from "api/SongAPI";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";

export default LyricSection = () => {
  const [lyric, setLyric] = useState();
  const route = useRoute();
  const { activeSong } = useSelector((state) => state.player);

  useEffect(() => {
    const fetchLyric = async () => {
      const data = await getLyric(activeSong.id);
      setLyric(data);
    };

    fetchLyric();
  }, [activeSong]);

  const getLyricLine = (words) => {
    let str = "";

    words.forEach((element) => {
      str = str + element.data + " ";
    });

    return str;
  };

  return (
    <View style={styles.lyricSection}>
      <Text style={styles.lyricTitle}>Lyric</Text>
      <ScrollView style={styles.lyricContainer} nestedScrollEnabled={true}>
        {lyric ? (
          lyric.map((e, index) => {
            return (
              <Text key={index} style={styles.lyricText}>
                {getLyricLine(e.words)}
              </Text>
            );
          })
        ) : (
          <Text style={styles.lyricText}>Chưa có lời bài hát</Text>
        )}
      </ScrollView>
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
    marginTop: 20,
  },
  lyricText: {
    color: COLORS.black,
    lineHeight: 30,
    fontSize: 20,
  },
  lyricTitle: {
    color: COLORS.black,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  lyricContainer: {
    flex: 1,
    maxHeight: 400,
  },
});
