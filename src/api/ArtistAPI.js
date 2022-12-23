import { hashParamNoId, hashParam } from "./Crypto";
import { requestZingMp3 } from "./ZingMp3API";
import { getTop100PlayList } from "./SongAPI";

// get 100 song of the first playlist in top 100
export const getArtist = async () => {
  try {
    const top100 = await getTop100PlayList();

    if (top100) {
      const resArtist = top100?.data[0]?.items[0].artists;

      let artist = [];
      resArtist.map((e) => artist.add(e.artists));
      console.log(JSON.stringify(artist));
    }
  } catch (err) {
    console.log(err);
  }
};
