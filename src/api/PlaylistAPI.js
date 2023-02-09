import { getHome } from "./homeAPI";
import { hashParam } from "./Crypto";
import { requestZingMp3 } from "./ZingMp3API";
import { reducePropertySong } from "./SongAPI";

const filterBySectionType = (data, sectionType) => {
  return data.filter((e) => e.sectionType === sectionType);
};

const reducePropertyItems = (data) => {
  return data.map((e) => ({
    id: e.encodeId,
    title: e.title,
    image: e.thumbnailM,
    des: e.sortDescription,
  }));
};

const reducePropertyPlaylist = (data) => {
  return data.map((e) => ({
    id: e.sectionId,
    title: e.title,
    items: reducePropertyItems(e.items),
  }));
};

const getDataPlaylist = async () => {
  try {
    const dataHome = await getHome();
    const data = dataHome?.data?.items;

    if (data) {
      return data;
    }
  } catch (err) {}
};

export const getSuggestedPlaylist = async () => {
  try {
    const dataPlaylist = await getDataPlaylist();

    if (dataPlaylist) {
      const data = filterBySectionType(dataPlaylist, "playlist");

      if (data) {
        return reducePropertyPlaylist(data);
      }
    }
  } catch (err) {}
};

export const getNewSong = async () => {
  try {
    const dataPlaylist = await getDataPlaylist();

    if (dataPlaylist) {
      const data = filterBySectionType(dataPlaylist, "new-release");

      if (data[0]?.items?.all) {
        const songs = await reducePropertySong(data[0].items.all);

        return {
          id: "new-release",
          songs: songs,
        };
      }
    }
  } catch (err) {}
};

// getDetailPlaylist
export const getDetailPlaylist = async (playlistId) => {
  const res = await requestZingMp3("/api/v2/page/get/playlist", {
    id: playlistId,
    sig: hashParam("/api/v2/page/get/playlist", playlistId),
  });

  if (res?.data) {
    return await reducePropertyDetailPlaylist(res.data);
  }
};

const reducePropertyDetailPlaylist = async (data) => {
  let result = {};

  result.id = data.encodeId;
  result.title = data.title;
  result.image = data.thumbnailM;
  result.like = data.like;
  result.description = data.sortDescription;
  result.duration = data.song?.totalDuration;
  result.songs = await reducePropertySong(data.song?.items);

  return result;
};
