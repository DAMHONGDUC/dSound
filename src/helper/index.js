import AsyncStorage from "@react-native-async-storage/async-storage";

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
  let min = Math.floor(duration / 60);
  let sec = duration - min * 60;

  let minutes = min < 10 ? "0" + min : min;
  let seconds = sec < 10 ? "0" + sec : sec;

  return minutes + ":" + seconds;
};
