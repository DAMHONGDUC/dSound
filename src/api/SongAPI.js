import { hashParamNoId, hashParam } from "./Crypto";
import { requestZingMp3 } from "./ZingMp3API";

// getTop100
export const getTop100PlayList = async () => {
  try {
    const res = await requestZingMp3("/api/v2/page/get/top-100", {
      sig: hashParamNoId("/api/v2/page/get/top-100"),
    });

    if (res) return res;
  } catch (err) {}
};

export const reducePropertySong = async (data) => {
  const songData = data.map((e) => ({
    id: e.encodeId,
    url: null,
    title: e.title,
    artist: e.artistsNames,
    artwork: e.thumbnailM,
    duration: e.duration,
  }));

  const URL = await getSongURL(songData[0].id);
  songData[0].url = URL;

  return songData;
};

// get 100 song of the first playlist in top 100
export const get100Song = async () => {
  try {
    const top100 = await getTop100PlayList();

    const playlistId = top100?.data[0]?.items[0]?.encodeId;

    if (playlistId) {
      const res = await requestZingMp3("/api/v2/page/get/playlist", {
        id: playlistId,
        sig: hashParam("/api/v2/page/get/playlist", playlistId),
      });

      if (res.data.song.items)
        return await reducePropertySong(res.data.song.items);
    }
  } catch (err) {}
};

// getSong by id
export const getSongById = (songId) => {
  try {
    const res = requestZingMp3("/api/v2/song/get/streaming", {
      id: songId,
      sig: hashParam("/api/v2/song/get/streaming", songId),
    });

    if (res) return res;
  } catch (err) {}
};

export const getSongURL = async (id) => {
  try {
    const data = await getSongById(id);
    return data.data["128"];
  } catch (err) {}
};

// getLyric
export const getLyric = async (songId) => {
  try {
    const res = await requestZingMp3("/api/v2/lyric/get/lyric", {
      id: songId,
      sig: hashParam("/api/v2/lyric/get/lyric", songId),
    });

    console.log(res);
    if (res) return res;
  } catch (err) {}
};
