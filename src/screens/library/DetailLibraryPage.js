import { COLORS } from "constants/theme";
import { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import PlaylistHeader from "screens/playlist/PlaylistHeader";
import { getDetailPlaylist } from "api/PlaylistAPI";
import { useSelector } from "react-redux";
import Loading from "components/Loading";
import SongRow from "screens/song/SongRow";
import PlayerController from "helper/PlayerController";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getListArtistSong } from "api/ArtistAPI";
import { ARTIST_FLOW, LIBRARY_FLOW, NORMAL_FLOW } from "constants/values";

export default function DetailLibraryPage() {
  const [dataPlaylist, setdataPlaylist] = useState();
  const navigation = useNavigation();
  const route = useRoute();
  const { currPlaylist, showBottomPlay } = useSelector((state) => state.player);

  useEffect(() => {
    let data = {};

    data.id = route.params.id;
    data.image = route.params.image;
    data.title = route.params.title;
    data.numOfSong = route.params.numOfSong;
    data.songs = route.params.songs ?? [];

    setdataPlaylist(data);
  }, []);

  const renderItem = ({ item, index }) => {
    return (
      <SongRow
        onClick={() => {
          PlayerController.onSongRowClick([
            currPlaylist,
            dataPlaylist,
            index,
            item.id,
            navigation,
          ]);
        }}
        image={{ uri: item.artwork }}
        name={item.title}
        artist={item.artist}
        duration={item.duration}
        id={item.id}
      />
    );
  };
  return (
    <View
      style={[styles.container, { marginBottom: showBottomPlay ? 60 : 20 }]}
    >
      {dataPlaylist?.songs ? (
        <FlatList
          data={dataPlaylist.songs}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => (
            <PlaylistHeader
              dataPlaylist={dataPlaylist}
              navigation={navigation}
              playlist={dataPlaylist}
              flow={LIBRARY_FLOW}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.notiText}>{"Không có bài hát !"}</Text>
          }
        />
      ) : (
        <Loading />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingLeft: 20,
    paddingRight: 20,
  },
  notiText: {
    color: COLORS.primary,
    alignSelf: "flex-start",
  },
});
