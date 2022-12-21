import { StyleSheet, View } from "react-native";
import { COLORS } from "constants/theme";

export default SeparateLine = () => (
  <View
    style={{
      marginTop: 15,
      marginBottom: 15,
      borderBottomColor: COLORS.grey,
      borderBottomWidth: StyleSheet.hairlineWidth,
    }}
  />
);
