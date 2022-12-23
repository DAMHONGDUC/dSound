import { COLORS } from "constants/theme";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";

import Feather from "react-native-vector-icons/Feather";

export default ArtistRow = ({ image, name, artist, duration, onClick }) => {
  const durationFormat = () => {
    let minutes = Math.floor(duration / 60);
    let seconds = duration - minutes * 60;
    return "0" + minutes + ":" + seconds;
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
          <Text numberOfLines={1} style={styles.follow}>
            88620 Follow
          </Text>
        </View>

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
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  name: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    maxWidth: 160,
  },
  follow: {
    color: COLORS.title,
    fontSize: 13,
  },
  duration: {
    color: COLORS.title,
    fontSize: 13,
  },
});
