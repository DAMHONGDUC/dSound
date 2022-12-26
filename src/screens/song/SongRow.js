import { COLORS } from "constants/theme";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";

export default SongRow = ({ image, name, artist, duration, onClick }) => {
  const durationFormat = () => {
    let min = Math.floor(duration / 60);
    let sec = duration - min * 60;

    let minutes = min < 10 ? "0" + min : min;
    let seconds = sec < 10 ? "0" + sec : sec;

    return minutes + ":" + seconds;
  };

  return (
    <TouchableHighlight
      underlayColor={COLORS.songRowClickColor}
      onPress={onClick}
    >
      <View style={styles.container}>
        <Image style={styles.image} source={image}></Image>
        <View style={styles.containerCenter}>
          <Text numberOfLines={1} style={styles.name}>
            {name}
          </Text>
          <View style={styles.containerArtist}>
            <Text numberOfLines={1} style={styles.artist}>
              {artist}
              {"  "}
            </Text>
            <Text style={styles.duration}>
              |{"  "}
              {durationFormat(duration)} mins
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <FontAwesome5
            name={"play-circle"}
            color={COLORS.primary}
            size={29}
            solid
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name={"more-vertical"} color={COLORS.black} size={25} />
        </TouchableOpacity>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 10,
    marginTop: 10,
  },
  containerCenter: {
    flexDirection: "column",
    width: 200,
    marginLeft: 10,
  },
  containerArtist: {
    flexDirection: "row",
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 15,
  },
  name: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    maxWidth: 160,
  },
  artist: {
    color: COLORS.title,
    fontSize: 13,
    maxWidth: 100,
  },
  duration: {
    color: COLORS.title,
    fontSize: 13,
  },
});
