import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "constants/theme";
import { useEffect, useState } from "react";
import { getLyric } from "api/SongAPI";
import { useSelector } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function LyricSection() {
  const [lyric, setLyric] = useState();

  const { activeSong } = useSelector((state) => state.player);
  const [showLyric, setShowLyric] = useState(false);

  useEffect(() => {
    const fetchLyric = async () => {
      const data = await getLyric(activeSong.id);
      setLyric(data);
    };

    if (showLyric) {
      fetchLyric();
    }
  }, [showLyric]);

  const getLyricLine = (words) => {
    let str = "";

    words.forEach((element) => {
      str = str + element.data + " ";
    });

    return str;
  };

  const onPress = () => {
    setShowLyric(!showLyric);
  };

  return (
    <View style={styles.lyricSection}>
      <View style={styles.buttonContainer}>
        <Text style={styles.lyricTitle}>Lyric</Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <AntDesign
            name={showLyric ? "up" : "down"}
            color={COLORS.black}
            size={22}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={[styles.lyricContainer, { height: showLyric ? 400 : 0 }]}
        nestedScrollEnabled={true}
      >
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
}

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
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    marginLeft: 12,
    marginBottom: 7,
  },
});
