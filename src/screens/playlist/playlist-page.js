import { COLORS } from "constants/theme";
import { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import PlaylistHeader from "./playlist-header";
import { getDetailPlaylist } from "api/PlaylistAPI";
import { useSelector } from "react-redux";
import Loading from "components/Loading";
import SongRow from "screens/song/song-row";
import PlayerController from "helper/PlayerController";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getListArtistSong } from "api/ArtistAPI";
import { ARTIST_FLOW, NORMAL_FLOW } from "constants/values";
import { pushMoreDataPlaylist, sleep } from "helper";
import ListFooterLoading from "components/ListFooterLoading";
import cloneDeep from "lodash.clonedeep";

export default function PlaylistPage() {
  const { currPlaylist, showBottomPlay } = useSelector((state) => state.player);
  const [dataPlaylist, setdataPlaylist] = useState();
  const navigation = useNavigation();
  const route = useRoute();
  const [flow, setFlow] = useState();

  const [currShowingData, setCurrShowingData] = useState({});
  const [loadingMore, setLoadingMore] = useState(false);
  const delay = 1;
  const endOfData =
    currShowingData?.songs?.length === dataPlaylist?.songs?.length;

  const setDataPlaylistToState = (data) => {
    setdataPlaylist(data);

    const newData = pushMoreDataPlaylist(data, { id: data.id, songs: [] }, 10);
    setCurrShowingData(cloneDeep(newData));
  };

  useEffect(() => {
    const getDataDetailPlaylist = async () => {
      const data = await getDetailPlaylist(route.params.id);

      // setdataPlaylist(data);
      setDataPlaylistToState(data);
    };

    const getDataDetailArtist = async () => {
      let data = await getListArtistSong(route.params.id, 1, 20);

      data.image = route.params.props.image;
      data.title = route.params.props.title;
      data.totalFollow = route.params.props.totalFollow;

      //setdataPlaylist(data);
      setDataPlaylistToState(data);
    };

    setFlow(route.params.type);
    switch (route.params.type) {
      case ARTIST_FLOW:
        getDataDetailArtist();
        break;
      case NORMAL_FLOW:
        getDataDetailPlaylist();
        break;
    }
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
        item={item}
        index={index}
        status={dataPlaylist.id === currPlaylist.id}
      />
    );
  };

  const handleOnEndReached = async () => {
    if (!endOfData) {
      setLoadingMore(true);

      await sleep(delay * 1000);

      const newData = pushMoreDataPlaylist(dataPlaylist, currShowingData, 10);
      setCurrShowingData(cloneDeep(newData));

      setLoadingMore(false);
    }
  };

  return (
    <View style={[styles.container, { marginBottom: showBottomPlay ? 60 : 0 }]}>
      {dataPlaylist?.songs ? (
        <FlatList
          data={currShowingData.songs}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => (
            <PlaylistHeader
              dataPlaylist={dataPlaylist}
              navigation={navigation}
              playlist={dataPlaylist}
              flow={flow}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.notiText}>{"Không có bài hát !"}</Text>
          }
          onEndReachedThreshold={0.5}
          onEndReached={handleOnEndReached}
          ListFooterComponent={() => loadingMore && <ListFooterLoading />}
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
