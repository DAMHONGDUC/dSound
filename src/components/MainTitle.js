import { COLORS } from "constants/theme";
import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function MainTitle() {
  return (
    <View style={styles.container}>
      <Image
        style={{ width: 35, height: 35 }}
        source={require("assets/app_icon.png")}
      />
      <Text style={styles.text}>dSound</Text>
      <TouchableOpacity style={{ flex: 0.1 }}>
        <FontAwesome5 name={"search"} solid />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text: {
    flex: 0.8,
    marginLeft: 15,
    fontSize: 17,
    color: COLORS.black,
    fontWeight: "500",
  },
});
