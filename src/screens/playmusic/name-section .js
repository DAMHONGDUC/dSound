import { Text, StyleSheet } from "react-native";
import { COLORS } from "constants/theme";
import { useSelector } from "react-redux";

export default function NameSection() {
  const activeSong = useSelector((state) => state.player.activeSong);

  return (
    <>
      <Text numberOfLines={1} style={styles.name}>
        {activeSong.title}
      </Text>
      <Text numberOfLines={1} style={styles.artist}>
        {activeSong.artist}
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  name: {
    alignSelf: "center",
    color: COLORS.black,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    maxWidth: 200,
  },
  artist: {
    alignSelf: "center",
    color: COLORS.title,
    fontSize: 15,
    maxWidth: 200,
  },
});
