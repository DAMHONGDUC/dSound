import { COLORS } from "constants/theme";
import { StyleSheet, View, Text, FlatList } from "react-native";
import Loading from "components/Loading";
import { useEffect, useState } from "react";
import LibraryHeader from "./LibraryHeader";
import LibraryPlaylistRow from "./LibraryPlaylistRow";
import { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import {
  USER_FAVORITE_PLAYLIST_COLLECTION,
  FAVORITE_PLAYLIST_COLLECTION,
} from "constants/values";
import { forEach } from "lodash";

export default function LibraryPage() {
  const [dataFavorite, setDataFavorite] = useState([
    { id: 1, title: "Bai hat yeu thich", songs: [] },
    { id: 2, title: "Bai hat yeu thich2", songs: [] },
  ]);
  const [notiText, setnotiText] = useState("Bạn chưa có playlist nào !");
  const [dataPlaylist, setDataPlaylist] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = firebase.auth().currentUser;
      let result = [];

      const docWithUId = await firestore()
        .collection(USER_FAVORITE_PLAYLIST_COLLECTION)
        .doc(res.uid)
        .get();

      if (docWithUId?._data?.playlistID) {
        const playlistIDArray = docWithUId._data.playlistID;

        playlistIDArray.forEach(async (element) => {
          const docWithPlaylistId = await firestore()
            .collection(FAVORITE_PLAYLIST_COLLECTION)
            .doc(element)
            .get();

          if (docWithPlaylistId?._data) {
            const playlist = docWithPlaylistId._data;

            result.push({
              id: element,
              title: playlist.title,
              songs: playlist.songs,
            });
            setDataPlaylist(result);
          }
        });
      }
    };
    fetchData();
  }, []);

  const renderItem = ({ item, index }) => {
    return (
      <LibraryPlaylistRow
        image={require("assets/default-loading-image.png")}
        title={item.title}
        numOfSong={item.songs.length}
      />
    );
  };

  return (
    <View style={styles.container}>
      <LibraryHeader />
      {dataPlaylist ? (
        <FlatList
          data={dataPlaylist}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Text style={styles.notiText}>{notiText}</Text>}
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
    padding: 20,
  },

  text: {
    fontSize: 20,
    color: COLORS.black,
    fontWeight: "500",
  },
  notiText: {
    color: COLORS.primary,
    alignSelf: "flex-start",
  },
});
