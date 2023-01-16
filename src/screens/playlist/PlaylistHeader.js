import { COLORS } from "constants/theme";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";

export default PlaylistHeader = ({ playlist }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: playlist.image }} style={styles.image} />
      <Text style={styles.name}>{playlist.title}</Text>
      <View style={styles.creatorContainer}>
        <Text style={styles.description}>{playlist.description}</Text>
        <Text style={styles.likes}>{playlist.like} Likes</Text>
      </View>
      <TouchableOpacity>
        <View style={styles.button}>
          <Text style={styles.buttonText}>PLAY</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    margin: 15,
  },
  name: {
    color: COLORS.black,
    fontSize: 22,
    fontWeight: "500",
  },
  creatorContainer: {
    flexDirection: "column",
    marginTop: 7,
  },
  description: {
    color: COLORS.title,
    fontSize: 15,
  },
  likes: {
    color: COLORS.title,
    fontSize: 15,
    marginTop: 5,
  },
  button: {
    backgroundColor: COLORS.primary,
    height: 50,
    width: 130,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});
