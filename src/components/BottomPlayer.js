import { COLORS } from "constants/theme";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import LinearGradient from "react-native-linear-gradient";

export default BottomPlayer = () => {
  const activeSong = useSelector((state) => state.player.activeSong);

  return (
    <View style={styles.constainer}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={["#205295", "#0A2647", "#1A120B"]}
      >
        <View style={styles.progress}></View>
        <View style={styles.row}>
          <View style={styles.row2}>
            <Image
              style={styles.image}
              source={require("assets/defaultSongImage.png")}
            ></Image>
            <View style={styles.titleSection}>
              <Text numberOfLines={1} style={styles.artist}>
                Name song
              </Text>
              <Text numberOfLines={1} style={styles.artist}>
                Name artist
              </Text>
            </View>
          </View>
          <View style={styles.row3}>
            <TouchableOpacity style={[styles.playButton, { marginRight: 35 }]}>
              <FontAwesome5
                name={"heart"}
                color={COLORS.white}
                size={23}
                solid
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.playButton}>
              <FontAwesome5
                name={"play"}
                color={COLORS.white}
                size={22}
                solid
              />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  constainer: {
    backgroundColor: COLORS.grey,
    position: "absolute",
    bottom: 55,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  row2: {
    flexDirection: "row",
  },
  row3: {
    flexDirection: "row",
  },
  image: {
    width: 40,
    height: 40,
  },
  progress: {
    height: 3,
    backgroundColor: COLORS.white,
  },
  titleSection: {
    marginLeft: 10,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  name: {
    color: COLORS.black,
    fontSize: 20,
    fontWeight: "bold",
    maxWidth: 200,
  },
  playButton: {
    marginRight: 20,
  },
});
