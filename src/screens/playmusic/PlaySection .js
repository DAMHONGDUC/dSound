import { View, TouchableOpacity, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { COLORS } from "constants/theme";

export default PlaySection = () => {
  return (
    <View style={styles.playSection}>
      <TouchableOpacity>
        <MaterialIcons
          name="skip-previous"
          color={COLORS.primary}
          size={40}
        ></MaterialIcons>
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesome5
          name={"play-circle"}
          color={COLORS.primary}
          size={60}
          solid
        />
      </TouchableOpacity>
      <TouchableOpacity>
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
