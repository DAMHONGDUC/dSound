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

export default PlayMusic = ({ navigation }) => {
  const activeSong = useSelector((state) => state.player.activeSong);

  const onPlay = () => {};

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
