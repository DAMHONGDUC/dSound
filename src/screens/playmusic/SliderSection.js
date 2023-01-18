import Slider from "@react-native-community/slider";
import { Text, View, StyleSheet } from "react-native";
import { COLORS, windowWidth } from "constants/theme";
import { useSelector } from "react-redux";
import { durationFormat } from "helper";
import { useState } from "react";
import TrackPlayer, { useProgress } from "react-native-track-player";

export default SliderSection = () => {
  const activeSong = useSelector((state) => state.player.activeSong);
  const [sliderValue, setsliderValue] = useState(0);
  const progress = useProgress();

  const sliderValueChange = (value) => {
    setsliderValue(value);
  };

  const onSlidingComplete = () => {
    TrackPlayer.seekTo(sliderValue);
  };

  return (
    <>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={activeSong.duration}
        minimumTrackTintColor={COLORS.primary}
        maximumTrackTintColor="#000000"
        thumbTintColor={COLORS.primary}
        value={progress.position}
        onValueChange={sliderValueChange}
        onSlidingComplete={onSlidingComplete}
      />
      <View style={styles.timeRow}>
        <Text style={[styles.time, { marginLeft: 17 }]}>
          {durationFormat(progress.position)}
        </Text>
        <Text style={[styles.time, { marginRight: 17 }]}>
          {durationFormat(activeSong.duration)}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  slider: {
    alignSelf: "center",
    height: 40,
    width: windowWidth - 50,
    marginTop: 20,
  },
  time: {
    alignSelf: "center",
    color: COLORS.title,
    fontSize: 13,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 21,
    paddingRight: 21,
  },
});
