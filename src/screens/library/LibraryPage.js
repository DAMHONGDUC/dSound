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
import Library from "./Library";

export default function LibraryPage() {
  const navigation = useNavigation();
  const { lovedSongId, currLovedSong } = useSelector((state) => state.player);

  const onPress = async ({ id, image, title, numOfSong }) => {
    const data =
      lovedSongId === id ? currLovedSong : await getAllSongByDocId(id).songs;

    navigation.navigate("PlaylistPage", {
      id: id,
      type: LIBRARY_FLOW,
      props: {
        image: image,
        title: title,
        numOfSong: numOfSong,
        songs: data,
      },
    });
  };

  return <Library onPress={onPress} />;
}
