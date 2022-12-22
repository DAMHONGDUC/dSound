import { hashParamNoId, hashParam } from "./Crypto";
import { requestZingMp3 } from "./ZingMp3API";

// getTop100
const getTop100 = async () => {
  try {
    const res = await requestZingMp3("/api/v2/page/get/top-100", {
      sig: hashParamNoId("/api/v2/page/get/top-100"),
    });

    if (res) return res;
  } catch (err) {
    console.log(err);
  }
};

const reduceProperty = (data) => {
  return data.map((e) => ({
    encodeId: e.encodeId,
    title: e.title,
    artistsNames: e.artistsNames,
    thumbnailM: e.thumbnailM,
    duration: e.duration,
  }));
};

// get 100 song of the first playlist in top 100
export const get100Song = async () => {
  try {
    const top100 = await getTop100();

    const playlistId = top100?.data[0]?.items[0]?.encodeId;

    if (playlistId) {
      const res = await requestZingMp3("/api/v2/page/get/playlist", {
        id: playlistId,
        sig: hashParam("/api/v2/page/get/playlist", playlistId),
      });

      if (res.data.song.items) return reduceProperty(res.data.song.items);
    }
  } catch (err) {
    console.log(err);
  }
};

// getSong by id
export const getSongById = (songId) => {
  try {
    const res = requestZingMp3("/api/v2/song/get/streaming", {
      id: songId,
      sig: hashParam("/api/v2/song/get/streaming", songId),
    });

    if (res) return res;
  } catch (err) {
    console.log(err);
  }
};
