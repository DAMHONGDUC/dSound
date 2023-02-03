import { COLORS } from "constants/theme";
import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";

export default function MainHeader() {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("assets/app_icon.png")} />
      <Text style={styles.text}>dSound</Text>
      <TouchableOpacity style={styles.button}>
        <Feather name={"settings"} color={COLORS.black} size={22} solid />
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
    backgroundColor: COLORS.white,
    paddingLeft: 15,
    paddingRight: 5,
  },
  text: {
    flex: 0.9,
    marginLeft: 15,
    fontSize: 20,
    color: COLORS.black,
    fontWeight: "500",
  },
  image: {
    width: 35,
    height: 35,
  },
  button: {
    flex: 0.1,
  },
});
