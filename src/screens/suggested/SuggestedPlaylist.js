import { View, Text, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { COLORS } from "constants/theme";
import PlaylistRow from "./PlaylistRow";

export default SuggestedPlaylist = ({ playlists }) => {
  const renderItem = ({ item, index }) => {
    return (
      <PlaylistRow
        onClick={() => {}}
        title={item.title}
        image={{ uri: item.image }}
        des={item.des}
      ></PlaylistRow>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{playlists.title || "Gợi Ý Cho Bạn "}</Text>
      <FlatList
        data={playlists.items}
        renderItem={renderItem}
        horizontal={true}
        keyExtractor={(item) => item.id}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: COLORS.white,
    marginBottom: 20,
  },
  title: {
    color: COLORS.primary,
    marginBottom: 7,
    fontSize: 16,
    fontWeight: "700",
  },
});
