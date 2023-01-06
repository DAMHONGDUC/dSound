import { StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, windowWidth } from "constants/theme";
import { ScrollView } from "react-native-gesture-handler";
import HeaderSection from "./HeaderSection";
import NameSection from "./NameSection ";
import PlaySection from "./PlaySection ";
import SliderSection from "./SliderSection";
import LyricSection from "./LyricSection";
import { useDispatch, useSelector } from "react-redux";
import TrackPlayer, { State } from "react-native-track-player";
import { useEffect, useState } from "react";
import {
  setCurrIndex,
  setSongURL,
  setActiveSong,
  setShowBottomPlay,
} from "redux/slices/playerSlide";
import { getSongURL } from "api/SongAPI";
import { cloneDeep } from "lodash";

export default PlayMusic = ({ navigation }) => {
  const dispatch = useDispatch();
  const currPlaylist = useSelector((state) => state.player.currPlaylist);
  const currIndex = useSelector((state) => state.player.currIndex);
  const activeSong = useSelector((state) => state.player.activeSong);

  useEffect(() => {
    dispatch(setShowBottomPlay(false));
  }, []);

  useEffect(() => {
    dispatch(setActiveSong(currPlaylist[currIndex]));
  }, [currIndex]);

  const setUpSongURL = async (index) => {
    let currSong = cloneDeep(currPlaylist[index]);

    if (index !== 0 && !currSong.url) {
      const URL = await getSongURL(currPlaylist[index].id);
      currSong.url = URL;
      dispatch(setSongURL(index, URL));

      await TrackPlayer.add(currSong, index);
      await TrackPlayer.remove(index + 1);
    }
  };

  const onPress = async () => {
    await setUpSongURL(currIndex);
    await TrackPlayer.skip(currIndex);
    await TrackPlayer.play();
  };

  const onNext = async () => {
    await setUpSongURL(currIndex + 1);
    await TrackPlayer.skipToNext();

    dispatch(setCurrIndex(currIndex + 1));
  };

  const onPrevious = async () => {
    if (currIndex >= 1) {
      await setUpSongURL(currIndex - 1);
      await TrackPlayer.skip(currIndex - 1);
      await TrackPlayer.play();

      dispatch(setCurrIndex(currIndex - 1));
    }
  };

  return (
    <SafeAreaView style={styles.conatiner}>
      <ScrollView>
        <HeaderSection navigation={navigation}></HeaderSection>
        <Image
          style={styles.image}
          source={{ uri: activeSong.artwork }}
        ></Image>
        <NameSection></NameSection>
        <SliderSection onEndSlider={onNext}></SliderSection>
        <PlaySection
          onPress={onPress}
          onNext={onNext}
          onPrevious={onPrevious}
        ></PlaySection>
        <LyricSection></LyricSection>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 20,
  },
  image: {
    height: windowWidth - 70,
    width: windowWidth - 70,
    borderRadius: 35,
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 20,
  },
});
