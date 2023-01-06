import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "constants/theme";
import { useDispatch } from "react-redux";
import { setShowBottomPlay } from "redux/slices/playerSlide";

export default HeaderSection = ({ navigation }) => {
  const dispatch = useDispatch();

  const collap = () => {
    navigation.pop();
    dispatch(setShowBottomPlay(true));
  };

  return (
    <View style={styles.row}>
      <TouchableOpacity>
        <Ionicons
          onPress={collap}
          name="arrow-back"
          color={COLORS.black}
          size={24}
        ></Ionicons>
      </TouchableOpacity>

      <TouchableOpacity>
        <Feather name={"more-vertical"} color={COLORS.black} size={25} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
