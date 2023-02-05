import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "constants/theme";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function LibraryHeader({ onClickCreate }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Thư viện</Text>
      <TouchableOpacity onPress={onClickCreate}>
        <AntDesign name="plus" color={COLORS.black} size={25} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  text: {
    fontSize: 20,
    color: COLORS.black,
    fontWeight: "500",
  },
});
