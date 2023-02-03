import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { View, TouchableOpacity, StyleSheet, BackHandler } from "react-native";
import { COLORS } from "constants/theme";
import { useDispatch } from "react-redux";
import { setShowBottomPlay } from "redux/slices/playerSlide";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";

export default function HeaderSection() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleBackButton = () => {
    navigation.pop();
    dispatch(setShowBottomPlay(true));
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        dispatch(setShowBottomPlay(true));
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [])
  );

  return (
    <View style={styles.row}>
      <View style={styles.view}>
        <TouchableOpacity>
          <MaterialIcons
            onPress={handleBackButton}
            name="expand-more"
            color={COLORS.black}
            size={35}
          />
        </TouchableOpacity>
      </View>

      {/* <View style={styles.view}>
        <TouchableOpacity>
          <Feather name={"more-vertical"} color={COLORS.black} size={27} />
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  view: {
    width: 60,
    height: 60,
    //backgroundColor: COLORS.yellow,
    alignItems: "center",
    justifyContent: "center",
  },
});
