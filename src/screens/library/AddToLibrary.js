import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setRefreshLibrary } from "redux/slices/playerSlide";
import { useNavigation } from "@react-navigation/native";
import Library from "./Library";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { COLORS } from "constants/theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function LibraryPage() {
  const navigation = useNavigation();
  const { lovedSongId, currLovedSong } = useSelector((state) => state.player);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setRefreshLibrary(true));
  }, []);

  const onPress = async ({ id, image, title, numOfSong }) => {
    console.log("add to library");
  };

  const handleBackButton = () => {
    console.log("pop");
    navigation.pop();
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight
        underlayColor={COLORS.white}
        onPress={handleBackButton}
      >
        <View style={styles.backButton}>
          <Ionicons name="arrow-back" color={COLORS.black} size={25} />
        </View>
      </TouchableHighlight>

      <Library onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  backButton: {
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
