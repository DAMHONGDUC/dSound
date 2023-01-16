import { COLORS } from "constants/theme";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList,
} from "react-native";
import SeparateLine from "components/SeparateLine";
import SongRow from "screens/song/SongRow";
import { get100Song, getSongById } from "api/SongAPI";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setCurrPlaylist,
  setCurrIndex,
  setActiveSong,
} from "redux/slices/playerSlide";
import TrackPlayer from "react-native-track-player";
import Loading from "components/Loading";
import PlayerController from "helper/PlayerController";
import { useSelector } from "react-redux";

export default function SongsRoute({ navigation }) {
  const [data100Song, setdata100Song] = useState();
  const dispatch = useDispatch();

  const { isPlaying, currPlaylist } = useSelector((state) => state.player);

  useEffect(() => {
    const fetchData = async () => {
      const data = await get100Song();
      setdata100Song(data);
    };

    fetchData();
  }, []);

  const onSongRowClick = async (item, index) => {
    if (currPlaylist.id !== data100Song.id) {
      PlayerController.resetTrackPlayer();

      dispatch(setCurrPlaylist(data100Song));

      await TrackPlayer.getState();
      await TrackPlayer.add(data100Song.items);
      await TrackPlayer.getState();
    }

    dispatch(setCurrIndex(index));

    navigation.navigate("PlayMusicPage");
  };

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
      {data100Song ? (
        <>
          <Text style={styles.mainText}>Top {data100Song.length} song</Text>
          <SeparateLine></SeparateLine>
          <FlatList
            data={data100Song.songs}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </>
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
    padding: 15,
  },
  mainText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
});
