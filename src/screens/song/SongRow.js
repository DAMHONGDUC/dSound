import { COLORS } from "constants/theme";
import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";

export default RowCustom = ({ image, name, artist, duration, onClick }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={image}></Image>
      <View style={styles.containerCenter}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.containerArtist}>
          <Text numberOfLines={1} style={styles.artist}>
            artiartistartistartistst
          </Text>
          <Text style={styles.duration}>| {duration} mins</Text>
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
      <TouchableOpacity style={{ marginLeft: 13 }}>
        <Feather name={"more-vertical"} color={COLORS.black} size={25} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  containerCenter: {
    marginLeft: 10,
    flexDirection: "column",
    marginRight: 15,
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
