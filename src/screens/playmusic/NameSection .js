import { Text, StyleSheet } from "react-native";
import { COLORS } from "constants/theme";

export default NameSection = () => {
  return (
    <>
      <Text numberOfLines={1} style={styles.name}>
        Star Boy
      </Text>
      <Text numberOfLines={1} style={styles.artist}>
        The Weekend, Daft Punk
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  name: {
    alignSelf: "center",
    color: COLORS.black,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    maxWidth: 200,
  },
  artist: {
    alignSelf: "center",
    color: COLORS.title,
    fontSize: 15,
    maxWidth: 200,
  },
});
