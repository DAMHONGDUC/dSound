import firestore from "@react-native-firebase/firestore";
import {
  USER_FAVORITE_PLAYLIST_COLLECTION,
  FAVORITE_PLAYLIST_COLLECTION,
} from "constants/values";
import { firebase } from "@react-native-firebase/auth";

const getCollectionByDocId = async (collection, docId) => {
  const res = await firestore().collection(collection).doc(docId).get();

  if (res?._data) {
    return res._data;
  }
};

export const getPlaylistByUid = async (uid) => {
  const result = [];

  const res = await getCollectionByDocId(
    USER_FAVORITE_PLAYLIST_COLLECTION,
    uid
  );

  if (res?.playlistID) {
    const playlistIDArray = res.playlistID;

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

export const addPlaylistToUserPlaylist = async (playlistID, uid) => {
  await firestore()
    .collection(USER_FAVORITE_PLAYLIST_COLLECTION)
    .doc(uid)
    .update({
      playlistID: firebase.firestore.FieldValue.arrayUnion(playlistID),
    });
};

export const createNewPlaylist = async (playlistName, uid) => {
  let playlistID = new Date().valueOf();

  await firestore()
    .collection(FAVORITE_PLAYLIST_COLLECTION)
    .doc(playlistID)
    .set({
      title: playlistName,
      songs: [],
    });

  await addPlaylistToUserPlaylist(playlistID, uid);
};
