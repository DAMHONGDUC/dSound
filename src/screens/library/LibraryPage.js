import { COLORS } from "constants/theme";
import { StyleSheet, View, Text, FlatList } from "react-native";
import Loading from "components/Loading";
import { useEffect, useState } from "react";
import LibraryHeader from "./LibraryHeader";
import LibraryPlaylistRow from "./LibraryPlaylistRow";
import { firebase } from "@react-native-firebase/auth";
import { getPlaylistByUid, createNewPlaylist } from "api/FirebaseAPI";
import Dialog from "react-native-dialog";
import { useSelector } from "react-redux";

export default function LibraryPage() {
  const notiText = "Bạn chưa có playlist nào !";
  const [dataPlaylist, setDataPlaylist] = useState();
  const [playlistName, setPlaylistName] = useState();
  const [showDialog, setShowDialog] = useState(false);
  const { uid } = useSelector((state) => state.player);
  const [refreshLibrary, setRefreshLibrary] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setDataPlaylist(null);

      const data = await getPlaylistByUid(uid);

      setDataPlaylist(data);
      setRefreshLibrary(false);
    };

    if (refreshLibrary && uid) {
      fetchData();
    }
  }, [refreshLibrary, uid]);

  const renderItem = ({ item, index }) => {
    return (
      <LibraryPlaylistRow
        image={require("assets/default-loading-image.png")}
        title={item.title}
        numOfSong={item.songs.length}
      />
    );
  };

  const createPlaylist = async () => {
    if (playlistName) {
      handleHideDialog();

      await createNewPlaylist(playlistName, uid);

      setRefreshLibrary(true);
    }
  };

  const handleShowDialog = () => {
    setShowDialog(true);
  };

  const handleHideDialog = () => {
    setShowDialog(false);
    setPlaylistName("");
  };

  return (
    <View style={styles.container}>
      <Dialog.Container visible={showDialog}>
        <Dialog.Title>Nhập tên playlist</Dialog.Title>
        <Dialog.Input onChangeText={(text) => setPlaylistName(text)} />
        <Dialog.Button label="Cancel" onPress={handleHideDialog} />
        <Dialog.Button label="Create" onPress={createPlaylist} />
      </Dialog.Container>
      <LibraryHeader onClickCreate={handleShowDialog} />
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
