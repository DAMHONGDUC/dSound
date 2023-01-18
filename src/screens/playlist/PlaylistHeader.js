import { COLORS } from "constants/theme";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import { setShowMainHeader } from "redux/slices/playerSlide";

export default PlaylistHeader = ({ playlist, navigation }) => {
  const dispatch = useDispatch();

  const handleBackButton = () => {
    navigation.pop();
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: playlist.image }} style={styles.image} />
      <TouchableOpacity onPress={handleBackButton} style={styles.backButton}>
        <Ionicons name="arrow-back" color={COLORS.black} size={25}></Ionicons>
      </TouchableOpacity>
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
    fontSize: 21,
    fontWeight: "500",
  },
  creatorContainer: {
    flexDirection: "column",
    marginTop: 7,
  },
  backButton: {
    position: "absolute",
    left: 0,
    top: 10,
  },
  description: {
    color: COLORS.title,
    fontSize: 14,
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
