import { COLORS } from "constants/theme";
import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Share from "react-native-share";

export default function MainHeader() {
  const shareOptions = {
    title: "Share via",
    message: "Enjoy free music with dSound",
    url: "https://play.google.com/store/apps/details?id=com.dsound",
  };

  const handleShare = () => {
    Share.open(shareOptions)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("assets/app_icon.png")} />
      <Text style={styles.text}>dSound</Text>
      <TouchableOpacity onPress={handleShare} style={styles.button}>
        <EvilIcons name={"share-google"} color={COLORS.black} size={35} solid />
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
    flex: 0.15,
  },
});
