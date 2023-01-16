import { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import SuggestedPlaylist from "./SuggestedPlaylist";
import { COLORS } from "constants/theme";
import { getSuggestedPlaylist, getNewSong } from "api/PlaylistAPI";
import NewSongRow from "./NewSongRow";
import Loading from "components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import TrackPlayer from "react-native-track-player";
import {
  setCurrPlaylist,
  setCurrIndex,
  setActiveSong,
} from "redux/slices/playerSlide";
import PlayerController from "helper/PlayerController";

export default function SuggestedRoute() {
  const [dataSuggestedPlaylist, setdataSuggestedPlaylist] = useState();
  const [dataNewSong, setdataNewSong] = useState();
  const [isLoaded, setisLoaded] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { isPlaying, currPlaylist } = useSelector((state) => state.player);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSuggestedPlaylist();

      setdataSuggestedPlaylist(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSuggestedPlaylist();

      setdataSuggestedPlaylist(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getNewSong();

      setdataNewSong(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (dataSuggestedPlaylist && dataNewSong) setisLoaded(true);
  }, [dataSuggestedPlaylist, dataNewSong]);

  const onClickSongRow = async (index) => {
    if (currPlaylist.id !== dataNewSong.id) {
      PlayerController.resetTrackPlayer();

      dispatch(setCurrPlaylist(dataNewSong));

      await TrackPlayer.getState();
      await TrackPlayer.add(dataNewSong.items);
      await TrackPlayer.getState();
    }

    dispatch(setCurrIndex(index));

    navigation.navigate("PlayMusicPage");
  };

  return isLoaded ? (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Mới Phát Hành</Text>
        <View style={styles.newSong}>
          {dataNewSong.songs.slice(0, 6).map((e, index) => (
            <NewSongRow
              key={e.id}
              title={e.title}
              image={{ uri: e.artwork }}
              artist={e.artist}
              onClick={() => onClickSongRow(index)}
            ></NewSongRow>
          ))}
        </View>
        {dataSuggestedPlaylist.map((e) => (
          <SuggestedPlaylist key={e.id} playlists={e}></SuggestedPlaylist>
        ))}
      </View>
    </ScrollView>
  ) : (
    <Loading />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: COLORS.white,
    padding: 18,
  },
  newSong: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    color: COLORS.primary,
    marginBottom: 7,
    fontSize: 16,
    fontWeight: "700",
  },
});
