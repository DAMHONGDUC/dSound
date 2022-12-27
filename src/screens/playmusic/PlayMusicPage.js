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
  setUpPlayer,
  setIsPlaying,
  setIsPause,
  setSongURL,
} from "redux/slices/playerSlide";
import { getSongURL } from "api/SongAPI";

export default PlayMusic = ({ navigation }) => {
  const dispatch = useDispatch();
  const [currURL, setcurrURL] = useState();

  const currPlaylist = useSelector((state) => state.player.currPlaylist);
  const isSetUpPlayer = useSelector((state) => state.player.isSetUpPlayer);
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const currIndex = useSelector((state) => state.player.currIndex);

  useEffect(() => {
    const setUpTrackPlayer = async () => {
      if (!isSetUpPlayer) {
        await TrackPlayer.setupPlayer();
        dispatch(setUpPlayer(true));
      }
    };

    setUpTrackPlayer();
  }, []);

  useEffect(() => {
    const getthisURL = async () => {
      const currSongURL = await getSongURL(currPlaylist[currIndex].id);
      setcurrURL(currSongURL);
    };

    getthisURL();
  }, []);

  useEffect(() => {
    dispatch(setSongURL({ index: currIndex, url: currURL }));
  }, [currURL]);

  useEffect(() => {
    const addTrack = async () => {
      if (isSetUpPlayer) {
        await TrackPlayer.add(currPlaylist);
      }
    };
    addTrack();
  }, [currPlaylist]);

  const onPress = async () => {
    if (!isPlaying) {
      await TrackPlayer.play();
      dispatch(setIsPlaying(true));
    } else {
      await TrackPlayer.pause();
      dispatch(setIsPlaying(false));
    }
  };

  return (
    <SafeAreaView style={styles.conatiner}>
      <ScrollView>
        <HeaderSection navigation={navigation}></HeaderSection>
        <Image
          style={styles.image}
          source={require("assets/starboy.png")}
        ></Image>
        <NameSection></NameSection>
        <SliderSection></SliderSection>
        <PlaySection onPress={onPress}></PlaySection>
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
