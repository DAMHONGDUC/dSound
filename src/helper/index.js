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
