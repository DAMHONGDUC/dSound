import { getHome } from "./homeAPI";
import { reducePropertySong } from "./SongAPI";

const filterBySectionType = (data, sectionType) => {
  return data.filter((e) => e.sectionType === sectionType);
};

const reducePropertyItems = (data) => {
  return data.map((e) => ({
    id: e.encodeId,
    title: e.title,
    image: e.thumbnail,
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

    if (data) return data;
  } catch (err) {}
};

export const getSuggestedPlaylist = async () => {
  try {
    const dataPlaylist = await getDataPlaylist();

    if (dataPlaylist) {
      const data = filterBySectionType(dataPlaylist, "playlist");

      if (data) return reducePropertyPlaylist(data);
    }
  } catch (err) {}
};

export const getNewSong = async () => {
  try {
    const dataPlaylist = await getDataPlaylist();

    if (dataPlaylist) {
      const data = filterBySectionType(dataPlaylist, "new-release");

      if (data[0]?.items?.all)
        return reducePropertySong(data[0].items.all, "newSong");
    }
  } catch (err) {}
};
