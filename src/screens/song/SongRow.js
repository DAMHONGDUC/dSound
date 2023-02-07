import { COLORS } from "constants/theme";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";
import { durationFormat } from "helper";
import { useSelector } from "react-redux";
import { usePlaybackState, State } from "react-native-track-player";
import PopUpSongOptions from "components/PopUpSongOptions";
import { useState } from "react";

export default function SongRow({
  image,
  name,
  artist,
  duration,
  onClick,
  id,
}) {
  const { activeSong } = useSelector((state) => state.player);
  const playBackState = usePlaybackState();
  const [showPopover, setShowPopover] = useState(false);

  return (
    <TouchableHighlight
      underlayColor={COLORS.songRowClickColor}
      onPress={onClick}
    >
      <View style={styles.container}>
        <Image style={styles.image} source={image} />
        <View style={styles.containerCenter}>
          <Text
            numberOfLines={1}
            style={[
              styles.name,
              { color: activeSong.id === id ? COLORS.primary : COLORS.black },
            ]}
          >
            {name}
          </Text>
          <View style={styles.containerArtist}>
            <Text numberOfLines={1} style={styles.artist}>
              {artist}
              {"  "}
            </Text>
            <Text style={styles.duration}>
              |{"  "}
              {durationFormat(duration)} mins
            </Text>
          </View>
        </View>

        <FontAwesome5
          name={
            activeSong.id === id && playBackState === State.Playing
              ? "pause-circle"
              : "play-circle"
          }
          color={COLORS.primary}
          size={29}
          solid
        />
        <PopUpSongOptions
          showPopover={showPopover}
          setShowPopover={setShowPopover}
          currSongRowId={id}
        />
        <View style={styles.songRowOptions}>
          <TouchableOpacity onPress={() => setShowPopover(true)}>
            <Feather name={"more-vertical"} color={COLORS.black} size={25} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableHighlight>
  );
}

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
    marginLeft: 10,
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
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    maxWidth: 160,
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
  songRowOptions: {
    flexDirection: "row",
    width: 50,
    justifyContent: "flex-end",
  },
});
