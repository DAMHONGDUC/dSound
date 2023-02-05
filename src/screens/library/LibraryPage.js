import { COLORS } from "constants/theme";
import { StyleSheet, View, Text, FlatList } from "react-native";
import Loading from "components/Loading";
import { useEffect, useState } from "react";
import LibraryHeader from "./LibraryHeader";
import LibraryPlaylistRow from "./LibraryPlaylistRow";
import { firebase } from "@react-native-firebase/auth";
import { getPlaylistByUid } from "api/FirebaseAPI";

export default function LibraryPage() {
  const notiText = "Bạn chưa có playlist nào !";
  const [dataPlaylist, setDataPlaylist] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = firebase.auth().currentUser;

      if (res?.uid) {
        const data = await getPlaylistByUid(res.uid);

        setDataPlaylist(data);
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
