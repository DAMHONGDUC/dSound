import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "constants/theme";

export default HeaderSection = ({ navigation }) => {
  return (
    <View style={styles.row}>
      <TouchableOpacity>
        <Ionicons
          onPress={() => navigation.pop()}
          name="arrow-back"
          color={COLORS.black}
          size={24}
        ></Ionicons>
      </TouchableOpacity>

      <TouchableOpacity>
        <Feather name={"more-vertical"} color={COLORS.black} size={25} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
