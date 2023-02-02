import { View, TouchableOpacity, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { COLORS } from "constants/theme";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import PlayerController from "helper/PlayerController";
import { useRoute } from "@react-navigation/native";
import { RepeatMode, State, usePlaybackState } from "react-native-track-player";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import TrackPlayer from "react-native-track-player";

export default PlaySection = () => {
  const { currIndex, currPlaylist, activeSong, repeatMode, shuffleMode } =
    useSelector((state) => state.player);
  const route = useRoute();
  const playBackState = usePlaybackState();

  useEffect(() => {
    if (route.params.currSongId !== activeSong.id) {
      PlayerController.onPlayNew(currIndex, currPlaylist);
    }
  }, []);

  const handlePlayPause = () => {
    PlayerController.onPlayPause(playBackState);
  };

  const handlePrevious = () => {
    PlayerController.onPrevious(currIndex);
  };

  const handleNext = async () => {
    if (shuffleMode) {
      PlayerController.onNextShuffle(currIndex, currPlaylist);
    } else {
      PlayerController.onNext();
    }
  };

  const handleRepeatMode = () => {
    PlayerController.onRepeat(repeatMode);
  };

  const handleShuffleMode = () => {
    PlayerController.onShuffle(shuffleMode);
  };

  return (
    <View style={styles.playSection}>
      <TouchableOpacity onPress={handleRepeatMode}>
        <Feather
          name="repeat"
          color={repeatMode ? COLORS.primary : COLORS.black}
          size={24}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePrevious}>
        <MaterialIcons name="skip-previous" color={COLORS.primary} size={40} />
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
        <MaterialIcons name="skip-next" color={COLORS.primary} size={40} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleShuffleMode}>
        <Ionicons
          name="shuffle-outline"
          color={shuffleMode ? COLORS.primary : COLORS.black}
          size={30}
        />
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
