import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";

export const storeData = async (storeKey, value) => {
  try {
    await AsyncStorage.setItem(storeKey, value);
  } catch (e) {
    // saving error
  }
};

export const getData = async (storeKey) => {
  try {
    const value = await AsyncStorage.getItem(storeKey);
    return value;
  } catch (e) {
    // error reading value
  }
};

export const durationFormat = (duration) => {
  if (!duration) {
    return "00:00";
  }

  let min = Math.floor(duration / 60);
  let sec = Math.floor(duration % 60);

  return String(min).padStart(2, "0") + ":" + String(sec).padStart(2, "0");
};

export const randomInRange = (start, end) => {
  return Math.floor(Math.random() * (end - start + 1) + start);
};

export const showToastAndroid = (text) => {
  ToastAndroid.show(text, ToastAndroid.SHORT);
};

export const pushMoreDataPlaylist = (totalData, currData, num) => {
  let result = currData;

  const length = currData?.songs?.length;
  const extraSongs = totalData.songs.slice(length, num + length);

  result.songs = currData.songs.concat(extraSongs);

  return result;
};

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const pushMoreDataArtist = (totalData, currData, num) => {
  let result = currData;

  const length = currData?.length;
  const extraArtist = totalData.slice(length, num + length);

  result = currData.concat(extraArtist);

  return result;
};
