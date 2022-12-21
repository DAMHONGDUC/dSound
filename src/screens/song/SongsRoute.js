import { COLORS } from "constants/theme";
import { StyleSheet, View, Text } from "react-native";
import SeparateLine from "components/SeparateLine";
import RowCustom from "screens/song/SongRow";

const songs = [
  {
    name: "Star Boy",
    artist: "The Weekend",
    duration: "03:01",
    image: require("assets/starboy.png"),
    id: 0,
  },
  {
    name: "Save Your Tear",
    artist: "The Weekend",
    duration: "03:01",
    image: require("assets/starboy.png"),
    id: 1,
  },
  {
    name: "Blinding Lights",
    artist: "The Weekend",
    duration: "03:01",
    image: require("assets/starboy.png"),
    id: 2,
  },
];

export default function SongsRoute() {
  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>{songs.length} Songs</Text>
      <SeparateLine></SeparateLine>
      {songs.map((e) => (
        <RowCustom
          key={e.id}
          image={e.image}
          name={e.name}
          artist={e.artist}
          duration={e.duration}
        ></RowCustom>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 20,
  },
  mainText: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "bold",
  },
});
