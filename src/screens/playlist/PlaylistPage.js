import { COLORS } from "constants/theme";
import { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import PlaylistHeader from "./PlaylistHeader";
import { getDetailPlaylist } from "api/PlaylistAPI";
import { useSelector } from "react-redux";
import Loading from "components/Loading";
import SongRow from "screens/song/SongRow";
import PlayerController from "helper/PlayerController";
import { useNavigation, useRoute } from "@react-navigation/native";

export default PlaylistPage = () => {
  const { currPlaylist } = useSelector((state) => state.player);
  const [dataPlaylist, setdataPlaylist] = useState();
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    const getDataDetailPlaylist = async () => {
      const data = await getDetailPlaylist(route.params.playlistId);

      setdataPlaylist(data);
    };

    getDataDetailPlaylist();
  }, []);

  const renderItem = ({ item, index }) => {
    return (
      <SongRow
        onClick={() => {
          PlayerController.onSongRowClick(
            currPlaylist,
            dataPlaylist,
            index,
            item.id,
            navigation
          );
        }}
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
      {dataPlaylist ? (
        <FlatList
          data={dataPlaylist.songs}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => (
            <PlaylistHeader
              dataPlaylist={dataPlaylist}
              navigation={navigation}
              playlist={dataPlaylist}
            />
          )}
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
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    //paddingTop: 10,
  },
});
