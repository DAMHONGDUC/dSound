import { StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, windowWidth } from "constants/theme";
import { ScrollView } from "react-native-gesture-handler";
import HeaderSection from "./header-section";
import NameSection from "./name-section ";
import PlaySection from "./play-section ";
import SliderSection from "./slider-section";
import LyricSection from "./lyric-section";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback } from "react";
import { setShowBottomPlay } from "stores/player/player-store";
import { useFocusEffect } from "@react-navigation/native";

export default function PlayMusic() {
  const dispatch = useDispatch();
  const activeSong = useSelector((state) => state.player.activeSong);

  // useEffect(() => {
  //   dispatch(setShowBottomPlay(false));
  // }, []);

  useFocusEffect(
    useCallback(() => {
      dispatch(setShowBottomPlay(false));
      return () => {};
    }, [])
  );

  return (
    <SafeAreaView style={styles.conatiner}>
      <ScrollView>
        <HeaderSection />
        <Image
          style={styles.image}
          source={
            activeSong.artwork
              ? { uri: activeSong.artwork }
              : require("assets/default-loading-image.png")
          }
        />
        <NameSection />
        <SliderSection />
        <PlaySection />
        <LyricSection />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: COLORS.white,
    // paddingLeft: 20,
    // paddingRight: 20,
    // paddingBottom: 20,
  },
  image: {
    height: windowWidth - 70,
    width: windowWidth - 70,
    borderRadius: 20,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 20,
  },
});
