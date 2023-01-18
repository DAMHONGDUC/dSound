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
import { useEffect } from "react";
import { setShowBottomPlay } from "redux/slices/playerSlide";

export default PlayMusic = () => {
  const dispatch = useDispatch();
  const activeSong = useSelector((state) => state.player.activeSong);

  useEffect(() => {
    dispatch(setShowBottomPlay(false));
  }, []);

  return (
    <SafeAreaView style={styles.conatiner}>
      <ScrollView>
        <HeaderSection></HeaderSection>
        <Image
          style={styles.image}
          source={
            activeSong.artwork
              ? { uri: activeSong.artwork }
              : require("assets/default-loading-image.png")
          }
        ></Image>
        <NameSection></NameSection>
        <SliderSection></SliderSection>
        <PlaySection></PlaySection>
        <LyricSection></LyricSection>
      </ScrollView>
    </SafeAreaView>
  );
};

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
