import axios from "axios";
import Config from "react-native-config";

export const VERSION = Config.ZINGMP3_VERSION;
export const SECRET_KEY = Config.ZINGMP3_SECRET_KEY;
export const CTIME = Math.floor(Date.now() / 1000);
const URL = Config.ZINGMP3_URL;
const API_KEY = Config.ZINGMP3_API_KEY;

const getCookie = async () => {
  try {
    const res = await axios.get(`${URL}`);

    if (res.headers["set-cookie"]) {
      res.headers["set-cookie"].map((element, index) => {
        return element; // return cookie
      });
    }
  } catch (err) {}
};

export const requestZingMp3 = async (path, qs) => {
  const client = axios.create({
    baseURL: `${URL}`,
  });
  client.interceptors.response.use((res) => res.data);

  try {
    const cookie = await getCookie();

    const res = await client.get(path, {
      headers: {
        Cookie: `${cookie}`,
      },
      params: {
        ...qs,
        ctime: CTIME,
        version: VERSION,
        apiKey: API_KEY,
      },
    });

    if (res) {
      return res;
    }
  } catch (err) {}
};
