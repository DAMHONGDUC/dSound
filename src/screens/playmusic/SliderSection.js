import Slider from "@react-native-community/slider";
import { Text, View, StyleSheet } from "react-native";
import { COLORS, windowWidth } from "constants/theme";

export default SliderSection = () => {
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
        <Text style={[styles.time, { marginLeft: 17 }]}>03:35</Text>
        <Text style={[styles.time, { marginRight: 17 }]}>03:50</Text>
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
