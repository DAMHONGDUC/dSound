import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableHighlight,
} from "react-native";
import { COLORS } from "constants/theme";
import { getDetailPlaylist } from "api/PlaylistAPI";
import { setCurrPlaylist } from "redux/slices/playerSlide";
import { useDispatch } from "react-redux";

export default PlaylistRow = ({ title, image, id, onClick }) => {
  const dispatch = useDispatch();

  const getDataDetailPlaylist = async () => {
    dispatch(setCurrPlaylist([]));

    const data = await getDetailPlaylist(id);
    dispatch(setCurrPlaylist(data));
  };

  const onPress = () => {
    onClick();
    getDataDetailPlaylist();
  };

  return (
    <TouchableHighlight
      underlayColor={COLORS.songRowClickColor}
      style={styles.container}
      onPress={onPress}
    >
      <View>
        <Image style={styles.image} source={image}></Image>
        <View>
          <Text numberOfLines={2} style={styles.title}>
            {title}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: COLORS.white,
    marginRight: 10,
    borderRadius: 15,
  },
  containerTitle: {
    flexDirection: "column",
    backgroundColor: COLORS.white,
  },
  title: {
    color: COLORS.black,
    maxWidth: 130,
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 2,
  },
  image: {
    height: 140,
    width: 140,
    borderRadius: 15,
  },
});
