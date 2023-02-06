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
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { LIBRARY_FLOW } from "constants/values";
import { getAllSongByDocId } from "api/LibraryAPI";
import LibraryComponent from "./LibraryComponent";

export default function LibraryPage() {
  const navigation = useNavigation();
  const { lovedSongId, currLovedSong } = useSelector((state) => state.player);
  const { refreshLibrary, uid } = useSelector((state) => state.player);
  const [dataPlaylist, setDataPlaylist] = useState();
  const dispatch = useDispatch();
  const route = useRoute();
  const [navToDetail, setNavToDetail] = useState();

  const onPress = async ({ id, image, title, numOfSong }) => {
    const data = await getAllSongByDocId(id);

    const songs = data.songs;

    navigation.navigate("DetailLibraryPage", {
      id: id,
      image: image,
      title: title,
      numOfSong: songs.length,
      songs: songs,
    });
  };

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

  return (
    <LibraryComponent
      setNavToDetail={navToDetail}
      dataPlaylist={dataPlaylist}
      onPress={onPress}
    />
  );
}
