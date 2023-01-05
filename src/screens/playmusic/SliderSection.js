import Slider from "@react-native-community/slider";
import { Text, View, StyleSheet } from "react-native";
import { COLORS, windowWidth } from "constants/theme";
import { useSelector } from "react-redux";
import { durationFormat } from "helper";
import { useState } from "react";

export default SliderSection = () => {
  const activeSong = useSelector((state) => state.player.activeSong);
  const [currTime, setcurrTime] = useState("00:00");

  return (
    <>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor={COLORS.primary}
        maximumTrackTintColor="#000000"
        thumbTintColor={COLORS.primary}
      />
      <View style={styles.timeRow}>
        <Text style={[styles.time, { marginLeft: 17 }]}>{currTime}</Text>
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
  },
});
