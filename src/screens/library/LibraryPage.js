import { useEffect, useState } from "react";
import { getPlaylistByUid, getAllSongByDocId } from "api/LibraryAPI";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setRefreshLibrary } from "stores/player/player-store";
import { useNavigation } from "@react-navigation/native";
import LibraryComponent from "./LibraryComponent";

export default function LibraryPage() {
  const navigation = useNavigation();
  const { refreshLibrary, uid } = useSelector((state) => state.player);
  const [dataPlaylist, setDataPlaylist] = useState();
  const dispatch = useDispatch();

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

  return <LibraryComponent dataPlaylist={dataPlaylist} onPress={onPress} />;
}
