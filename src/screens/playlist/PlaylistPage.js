import { COLORS } from "constants/theme";
import { useEffect } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import PlaylistHeader from "./PlaylistHeader";
import { getDetailPlaylist } from "api/PlaylistAPI";
import { useSelector } from "react-redux";
import Loading from "components/Loading";
import SongRow from "screens/song/SongRow";

export default PlaylistPage = () => {
  const { currPlaylist } = useSelector((state) => state.player);

  const renderItem = ({ item, index }) => {
    return (
      <SongRow
        onClick={() => onSongRowClick(item, index)}
        image={{ uri: item.artwork }}
        name={item.title}
        artist={item.artist}
        duration={item.duration}
        id={item.id}
      ></SongRow>
    );
  };
  return (
    <View style={styles.container}>
      {currPlaylist ? (
        <FlatList
          data={currPlaylist.songs}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => <PlaylistHeader playlist={currPlaylist} />}
        />
      ) : (
        <Loading />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 20,
  },
});
