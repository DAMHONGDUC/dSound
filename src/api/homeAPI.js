import { hashParamHome } from "./Crypto";
import { requestZingMp3 } from "./ZingMp3API";

export const getHome = async () => {
  try {
    const res = await requestZingMp3("/api/v2/page/get/home", {
      page: 1,
      segmentId: "-1",
      count: "30",
      sig: hashParamHome("/api/v2/page/get/home"),
    });

    if (res) {
      return res;
    }
  } catch (err) {}
};
