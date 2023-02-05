import firestore from "@react-native-firebase/firestore";
import {
  USER_FAVORITE_PLAYLIST_COLLECTION,
  FAVORITE_PLAYLIST_COLLECTION,
} from "constants/values";

const getCollectionByDocId = async (collection, docId) => {
  const res = await firestore().collection(collection).doc(docId).get();

  if (res?._data) {
    return res._data;
  }
};

export const getPlaylistByUid = async (uid) => {
  const res = await getCollectionByDocId(
    USER_FAVORITE_PLAYLIST_COLLECTION,
    uid
  );
  const playlistIDArray = res.playlistID;
  const result = [];

  if (playlistIDArray) {
    for (const playlistID of playlistIDArray) {
      const data = await firestore()
        .collection(FAVORITE_PLAYLIST_COLLECTION)
        .doc(playlistID)
        .get();

      if (data?._data) {
        const playlist = data._data;

        result.push({
          id: playlistID,
          title: playlist.title,
          songs: playlist.songs,
        });
      }
    }
  }

  return result;
};
