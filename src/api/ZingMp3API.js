import axios from "axios";
import crypto from "crypto";
import buffer from "buffer";

const VERSION = "1.6.34";
const URL = "https://zingmp3.vn";
const SECRET_KEY = "2aa2d1c561e809b267f3638c4a307aab";
const API_KEY = "88265e23d4284f25963e6eedac8fbfa3";
const CTIME = Math.floor(Date.now() / 1000);

const getHash256 = (str) => {
  return crypto.createHash("sha256").update(str).digest("hex");
};

const getHmac512 = (str, key) => {
  // console.log("buffer", Buffer.from(str, "utf8"));
  let hmac = crypto.createHmac("sha512", key);
  return hmac.update(Buffer.from(str, "utf8")).digest("hex");
};

const hashParamNoId = (path) => {
  // console.log(
  //   "chuoi ma hoa 512: ",
  //   path + getHash256(`ctime=${CTIME}version=${VERSION}`)
  // );
  return getHmac512(
    path + getHash256(`ctime=${CTIME}version=${VERSION}`),
    SECRET_KEY
  );
};

const getCookie = () => {
  return new Promise((resolve, rejects) => {
    axios
      .get(`${URL}`)
      .then((res) => {
        // TODO: Skip Error Object is possibly 'undefined'
        if (res.headers["set-cookie"]) {
          res.headers["set-cookie"].map((element, index) => {
            console.log(index);
            console.log(element);
            // if (index == 0) {
            resolve(element); // return cookie
            // }
          });
        }
      })
      .catch((err) => {
        rejects(err); // return error value if any
      });
  });
};

const requestZingMp3 = (path, qs) => {
  // console.log("qs", qs);
  return new Promise((resolve, rejects) => {
    // Config axios request default URL "https://zingmp3.vn"
    const client = axios.create({
      baseURL: `${URL}`,
    });

    client.interceptors.response.use((res) => res.data); // setting axios response data

    getCookie()
      .then((cookie) => {
        // request
        client
          .get(path, {
            headers: {
              Cookie: `${cookie}`,
            },
            params: {
              ...qs,
              ctime: CTIME,
              version: VERSION,
              apiKey: API_KEY,
            },
          })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            rejects(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

// getTop100
export const getTop100 = () => {
  // console.log("CTIME: ", CTIME);
  // console.log("VERSION: ", VERSION);
  // console.log("SECRET_KEY: ", SECRET_KEY);

  // console.log("getHash256: ", getHash256(`ctime=${CTIME}version=${VERSION}`));
  // console.log(
  //   "hashParamNoId, getHmac512: ",
  //   hashParamNoId("/api/v2/page/get/top-100")
  // );

  return new Promise((resolve, rejects) => {
    requestZingMp3("/api/v2/page/get/top-100", {
      sig: hashParamNoId("/api/v2/page/get/top-100"),
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        rejects(err);
      });
  });
};
