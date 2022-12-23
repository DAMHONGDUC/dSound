import { hashParamNoId, hashParam } from "./Crypto";
import { requestZingMp3 } from "./ZingMp3API";
import { getTop100PlayList } from "./SongAPI";

const reduceProperty = (data) => {
  return data.map((e) => ({
    id: e.id,
    name: e.name,
    thumbnailM: e.thumbnailM,
    totalFollow: e.totalFollow,
  }));
};

const checkElementExist = (id, data) => {
  data.forEach((element) => {
    console.log("id", id, ", ", id.length);
    console.log("element.id", element.id, ", ", element.id.length);
    var str1 = "hello world";
    var str2 = "hello world";
    if (str1 === str2) {
      console.log("entry");
      return true;
    }
  });

  return false;
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
                let found = artist.some((e) => e.id == currArtist.id);
                if (!found) artist.push(currArtist);
              });
            }
          });
        }
      });

      console.log(artist);
      if (artist.length > 0) return reduceProperty(artist);
    }
  } catch (err) {
    console.log(err);
  }
};
