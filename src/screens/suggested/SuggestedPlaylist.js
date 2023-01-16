import { View, Text, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { COLORS } from "constants/theme";
import PlaylistRow from "./PlaylistRow";
import { useNavigation } from "@react-navigation/native";
import { getDetailPlaylist } from "api/PlaylistAPI";

export default SuggestedPlaylist = ({ playlists }) => {
  const navigation = useNavigation();

  const renderItem = ({ item, index }) => {
    return (
      <PlaylistRow
        onClick={() => {
          navigation.navigate("PlaylistPage");
        }}
        title={item.title}
        image={{ uri: item.image }}
        des={item.des}
        id={item.id}
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
