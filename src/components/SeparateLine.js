import { StyleSheet, View } from "react-native";
import { COLORS } from "constants/theme";

export default function SeparateLine() {
  return <View style={styles.line} />;
}

const styles = StyleSheet.create({
  line: {
    marginTop: 15,
    marginBottom: 15,
    borderBottomColor: COLORS.grey,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
