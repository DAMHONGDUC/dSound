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
          type: playlist.type,
        });
      }
    }
  }

  return result;
};

const checkDocExist = async (collection, docID) => {
  const doc = await firestore().collection(collection).doc(docID).get();

  return doc._exists;
};

export const removeASongWithDocId = async (songid, docid, cussSongs) => {
  const newSongs = cussSongs.filter((e) => e.id !== songid);

  await firestore().collection(FAVORITE_PLAYLIST_COLLECTION).doc(docid).update({
    songs: newSongs,
  });

  return newSongs;
};

export const checkSongExist = async (collection, docid, songid) => {
  const currLovedSong = await firestore()
    .collection(collection)
    .doc(docid)
    .get();

  const listLovedSongID = currLovedSong._data.songs.map((e) => e.id);
  const check = listLovedSongID.includes(songid);

  return check;
};

const createNewDoc = async (collection, docID) => {
  await firestore().collection(collection).doc(docID).set({
    playlistID: [],
  });
};

export const addPlaylistToUserPlaylist = async (playlistID, uid) => {
  const res = await checkDocExist(USER_FAVORITE_PLAYLIST_COLLECTION, uid);

  if (!res) {
    await createNewDoc(USER_FAVORITE_PLAYLIST_COLLECTION, uid);
  }

  await firestore()
    .collection(USER_FAVORITE_PLAYLIST_COLLECTION)
    .doc(uid)
    .update({
      playlistID: firebase.firestore.FieldValue.arrayUnion(playlistID),
    });
};

export const createNewPlaylist = async (
  playlistID,
  playlistName,
  uid,
  type
) => {
  const docExist = await checkDocExist(
    FAVORITE_PLAYLIST_COLLECTION,
    playlistID
  );

  !docExist &&
    (await firestore()
      .collection(FAVORITE_PLAYLIST_COLLECTION)
      .doc(playlistID)
      .set({
        songs: [],
        title: playlistName,
        type: type,
      }));

  await addPlaylistToUserPlaylist(playlistID, uid);
};

export const addSongWithDocId = async (song, docid) => {
  await firestore()
    .collection(FAVORITE_PLAYLIST_COLLECTION)
    .doc(docid)
    .update({
      songs: firebase.firestore.FieldValue.arrayUnion(song),
    });
};

export const getAllSongByDocId = async (docid) => {
  const res = await firestore()
    .collection(FAVORITE_PLAYLIST_COLLECTION)
    .doc(docid)
    .get();

  if (res?._data) {
    return res._data;
  }
};
