import { hashListMV } from "./Crypto";
import { requestZingMp3 } from "./ZingMp3API";
import { getTop100PlayList } from "./SongAPI";
import { reducePropertySong } from "./SongAPI";

const reduceProperty = (data) => {
  return data.map((e) => ({
    id: e.id,
    name: e.name,
    thumbnailM: e.thumbnailM,
    totalFollow: e.totalFollow,
  }));
};

// get artist of the top 100 playlist
export const getArtist = async () => {
  try {
    const top100 = await getTop100PlayList();

    if (top100?.data) {
      let artist = [];

      top100?.data.forEach((data) => {
        if (data.items) {
          data.items.forEach((item) => {
            if (item.artists) {
              item.artists.forEach((currArtist) => {
                let found = artist.some((e) => e.id === currArtist.id);
                if (!found) {
                  artist.push(currArtist);
                }
              });
            }
          });
        }
      });

      if (artist.length > 0) {
        return reduceProperty(artist);
      }
    }
  } catch (err) {}
};

export const getListArtistSong = async (artistId, page, count) => {
  try {
    const res = await requestZingMp3("/api/v2/song/get/list", {
      id: artistId,
      type: "artist",
      page: page,
      count: count,
      sort: "new",
      sectionId: "aSong",
      sig: hashListMV("/api/v2/song/get/list", artistId, "artist", page, count),
    });

    if (res?.data?.items) {
      const songs = await reducePropertySong(res.data.items);

      return { id: artistId, songs: songs };
    }
  } catch (err) {}
};
