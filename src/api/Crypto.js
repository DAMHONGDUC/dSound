import crypto from "crypto";
import { CTIME, VERSION, SECRET_KEY } from "./ZingMp3API";

const getHash256 = (str) => {
  return crypto.createHash("sha256").update(str).digest("hex");
};

const getHmac512 = (str, key) => {
  let hmac = crypto.createHmac("sha512", key);
  return hmac.update(Buffer.from(str, "utf8")).digest("hex");
};

export const hashParamNoId = (path) => {
  return getHmac512(
    path + getHash256(`ctime=${CTIME}version=${VERSION}`),
    SECRET_KEY
  );
};

export const hashParam = (path, id) => {
  return getHmac512(
    path + getHash256(`ctime=${CTIME}id=${id}version=${VERSION}`),
    SECRET_KEY
  );
};

export const hashParamHome = (path) => {
  return getHmac512(
    path + getHash256(`count=30ctime=${CTIME}page=1version=${VERSION}`),
    SECRET_KEY
  );
};

export const hashListMV = (path, id, type, page, count) => {
  return getHmac512(
    path +
      getHash256(
        `count=${count}ctime=${CTIME}id=${id}page=${page}type=${type}version=${VERSION}`
      ),
    SECRET_KEY
  );
};
