import { View, TouchableOpacity, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { COLORS } from "constants/theme";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import PlayerController from "helper/PlayerController";
import { useRoute } from "@react-navigation/native";
import { State, usePlaybackState } from "react-native-track-player";

export default PlaySection = () => {
  const { currIndex, activeSong } = useSelector((state) => state.player);
  const route = useRoute();
  const playBackState = usePlaybackState();

  useEffect(() => {
    if (route.params.currSongId !== activeSong.id) {
      PlayerController.onPlayNew(currIndex);
    }
  }, []);

  const handlePlayPause = () => {
    PlayerController.onPlayPause(playBackState === State.Playing);
  };

  const handlePrevious = () => {
    PlayerController.onPrevious(currIndex);
  };

  const handleNext = () => {
    PlayerController.onNext();
  };

  return (
    <View style={styles.playSection}>
      <TouchableOpacity onPress={handlePrevious}>
        <MaterialIcons
          name="skip-previous"
          color={COLORS.primary}
          size={40}
        ></MaterialIcons>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePlayPause}>
        <FontAwesome5
          name={
            playBackState === State.Playing ? "pause-circle" : "play-circle"
          }
          color={COLORS.primary}
          size={60}
          solid
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNext}>
        <MaterialIcons
          name="skip-next"
          color={COLORS.primary}
          size={40}
        ></MaterialIcons>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  playSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    alignItems: "center",
  },
});
