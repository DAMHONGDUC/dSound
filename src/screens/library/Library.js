import { COLORS } from "constants/theme";
import { StyleSheet, View, Text, FlatList } from "react-native";
import Loading from "components/Loading";
import { useEffect, useState } from "react";
import LibraryHeader from "./LibraryHeader";
import LibraryPlaylistRow from "./LibraryPlaylistRow";
import { getPlaylistByUid, createNewPlaylist } from "api/LibraryAPI";
import Dialog from "react-native-dialog";
import { useSelector } from "react-redux";
import { USER_CUSTOM_PLAYLIST, LOVED_SONG_PLAYLIST } from "constants/values";
import { useDispatch } from "react-redux";
import { setRefreshLibrary } from "redux/slices/playerSlide";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { LIBRARY_FLOW } from "constants/values";
import { getAllSongByDocId } from "api/LibraryAPI";

export default function Library({ onPress }) {
  const notiText = "Bạn chưa có playlist nào !";
  const [dataPlaylist, setDataPlaylist] = useState();
  const [playlistName, setPlaylistName] = useState();
  const [showDialog, setShowDialog] = useState(false);
  const { uid } = useSelector((state) => state.player);
  const { refreshLibrary } = useSelector((state) => state.player);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { lovedSongId, currLovedSong } = useSelector((state) => state.player);

  const fetchData = async () => {
    setDataPlaylist(null);

    const data = await getPlaylistByUid(uid);

    setDataPlaylist(data);
    dispatch(setRefreshLibrary(false));
  };

  useEffect(() => {
    if (refreshLibrary && uid) {
      fetchData();
    }
  }, [refreshLibrary, uid]);

  //   const onPress = async ({ id, image, title, numOfSong }) => {
  //     const data =
  //       lovedSongId === id ? currLovedSong : await getAllSongByDocId(id).songs;

  //     navigation.navigate("PlaylistPage", {
  //       id: id,
  //       type: LIBRARY_FLOW,
  //       props: {
  //         image: image,
  //         title: title,
  //         numOfSong: numOfSong,
  //         songs: data,
  //       },
  //     });
  //   };

  const renderItem = ({ item, index }) => {
    return (
      <LibraryPlaylistRow
        image={
          item.type === LOVED_SONG_PLAYLIST
            ? require("assets/loved_song_playlist.png")
            : require("assets/default_playlist.png")
        }
        title={item.title}
        numOfSong={item.songs.length}
        id={item.id}
        onPress={() => onPress(item)}
      />
    );
  };

  const createPlaylist = async () => {
    if (playlistName) {
      handleHideDialog();

      const playlistID = new Date().valueOf() + playlistName;
      await createNewPlaylist(
        playlistID,
        playlistName,
        uid,
        USER_CUSTOM_PLAYLIST
      );

      dispatch(setRefreshLibrary(true));
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
