import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  Text,
  ScrollView,
} from "react-native";
import SuggestedPlaylist from "./SuggestedPlaylist";
import { COLORS } from "constants/theme";
import { getSuggestedPlaylist, getNewSong } from "api/PlaylistAPI";
import NewSongRow from "./NewSongRow";
import Loading from "components/Loading";

export default function SuggestedRoute() {
  const [dataSuggestedPlaylist, setdataSuggestedPlaylist] = useState();
  const [dataNewSong, setdataNewSong] = useState();
  const [isLoaded, setisLoaded] = useState(false);

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

    // console.log(JSON.stringify(dataSuggestedPlaylist));
  }, [dataSuggestedPlaylist, dataNewSong]);

  return isLoaded ? (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Mới Phát Hành</Text>
        <View style={styles.newSong}>
          {dataNewSong.slice(0, 6).map((e) => (
            <NewSongRow
              key={e.id}
              title={e.title}
              image={{ uri: e.artwork }}
              artist={e.artist}
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
