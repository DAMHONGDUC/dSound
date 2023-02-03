import axios from "axios";

export const VERSION = "1.6.34";
export const SECRET_KEY = "2aa2d1c561e809b267f3638c4a307aab";
export const CTIME = Math.floor(Date.now() / 1000);
const URL = "https://zingmp3.vn";
const API_KEY = "88265e23d4284f25963e6eedac8fbfa3";

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
