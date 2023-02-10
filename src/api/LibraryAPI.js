import firestore from "@react-native-firebase/firestore";
import {
  USER_FAVORITE_PLAYLIST_COLLECTION,
  FAVORITE_PLAYLIST_COLLECTION,
} from "constants/values";
import { firebase } from "@react-native-firebase/auth";
import { getSongURL } from "./SongAPI";

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

  if (res?.playlistID) {
    const playlistIDArray = res.playlistID;

    const promiseArray = playlistIDArray.map((playlistID) => {
      return firestore()
        .collection(FAVORITE_PLAYLIST_COLLECTION)
        .doc(playlistID)
        .get()
        .then((data) => {
          if (data?._data) {
            const playlist = data._data;

            return {
              id: playlistID,
              title: playlist.title,
              songs: playlist.songs,
              type: playlist.type,
            };
          }
        });
    });

    return Promise.all(promiseArray);
  }
};

export const getDataAndSetUpFirstSong = async (uid) => {
  let data = await getPlaylistByUid(uid);
  let result = [];

  if (data) {
    // console.log(JSON.stringify(data[].songs[0]));
    // if (data.songs[0]) {
    //   console.log(data.songs[0]);

    //   const URL = await getSongURL(data.songs[0].id);

    //   data.songs[0].url = URL;
    // }

    //console.log(JSON.stringify(data));

    for (let e of data) {
      if (e.songs[0] && !e.songs[0].url) {
        const URL = await getSongURL(e.songs[0].id);

        e.songs[0].url = URL;
      }
      result.push(e);
    }
  }

  console.log(JSON.stringify(result));

  return data;
};

export const checkDocExist = async (collection, docID) => {
  const doc = await firestore().collection(collection).doc(docID).get();

  return doc._exists;
};

export const removeASongWithDocId = async (songid, docid, currSongs) => {
  const newSongs = currSongs.filter((e) => e.id !== songid);

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

  return listLovedSongID.includes(songid);
};

const createNewDoc = async (collection, docID) => {
  await firestore().collection(collection).doc(docID).set({
    playlistID: [],
  });
};

export const addPlaylistToUserPlaylist = async (playlistID, uid) => {
  const isExist = await checkDocExist(USER_FAVORITE_PLAYLIST_COLLECTION, uid);

  if (!isExist) {
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

  if (!docExist) {
    await firestore()
      .collection(FAVORITE_PLAYLIST_COLLECTION)
      .doc(playlistID)
      .set({
        songs: [],
        title: playlistName,
        type: type,
      });
  }

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

  return res?._data ?? [];
};

export const removeWithDocId = async (collection, docId, uid, dataPlaylist) => {
  const playlistID = dataPlaylist.map((e) => e.id);
  const newPlaylistID = playlistID.filter((e) => e !== docId);

  await firestore().collection(collection).doc(docId).delete();

  await firestore().collection(USER_FAVORITE_PLAYLIST_COLLECTION).doc(uid).set({
    playlistID: newPlaylistID,
  });
};
