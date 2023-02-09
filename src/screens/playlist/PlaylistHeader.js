import { COLORS } from "constants/theme";
import { ARTIST_FLOW, LIBRARY_FLOW, NORMAL_FLOW } from "constants/values";
import PlayerController from "helper/PlayerController";
import { useEffect, useState } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setInitFirstSong } from "redux/slices/playerSlide";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function PlaylistHeader({
  playlist,
  navigation,
  dataPlaylist,
  flow,
}) {
  const { currPlaylist, shuffleMode, replayPlaylist } = useSelector(
    (state) => state.player
  );
  const dispatch = useDispatch();
  const [subTitle, setSubTitle] = useState();

  useEffect(() => {
    switch (flow) {
      case NORMAL_FLOW:
        setSubTitle(playlist.like + " Likes");
        break;
      case ARTIST_FLOW:
        setSubTitle(playlist.totalFollow + " Follow");
        break;
      case LIBRARY_FLOW:
        setSubTitle(playlist.numOfSong + " Bài hát");
        break;
    }
  }, [flow]);

  const handleBackButton = () => {
    navigation.pop();
  };

  const handleShuffleMode = () => {
    PlayerController.onShuffle(shuffleMode);
  };

  const handlePlayPlaylist = () => {
    if (dataPlaylist.songs[0]) {
      dispatch(setInitFirstSong(true));

      PlayerController.onSongRowClick([
        currPlaylist,
        dataPlaylist,
        0,
        dataPlaylist.songs[0].id,
        navigation,
      ]);
    }
  };

  const handleReplayPlaylist = () => {
    PlayerController.onReplayPlaylist(replayPlaylist);
  };

  return (
    <View style={styles.container}>
      <Image
        source={
          flow === LIBRARY_FLOW ? playlist.image : { uri: playlist.image }
        }
        style={styles.image}
      />
      <View style={styles.backButton}>
        <TouchableOpacity onPress={handleBackButton}>
          <Ionicons name="arrow-back" color={COLORS.black} size={25} />
        </TouchableOpacity>
      </View>

      <Text style={styles.name}>{playlist.title}</Text>
      <View style={styles.creatorContainer}>
        <Text numberOfLines={2} style={styles.description}>
          {playlist.description}
        </Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handlePlayPlaylist}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>PLAY</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.playlistOption}>
          <TouchableOpacity onPress={handleShuffleMode}>
            <Ionicons
              name="shuffle-outline"
              color={shuffleMode ? COLORS.primary : COLORS.black}
              size={40}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 15 }}
            onPress={handleReplayPlaylist}
          >
            <MaterialIcons
              name="replay"
              color={replayPlaylist ? COLORS.primary : COLORS.black}
              size={35}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    marginTop: 10,
  },
  image: {
    width: 200,
    height: 200,
    margin: 15,
    alignSelf: "center",
    marginTop: 25,
  },
  name: {
    color: COLORS.black,
    fontSize: 21,
    fontWeight: "500",
    alignSelf: "center",
  },
  creatorContainer: {
    flexDirection: "column",
    marginTop: 7,
    alignSelf: "flex-start",
  },
  backButton: {
    position: "absolute",
    width: 60,
    height: 60,
    // backgroundColor: COLORS.yellow,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  description: {
    color: COLORS.title,
    fontSize: 14,
  },
  subTitle: {
    color: COLORS.title,
    fontSize: 15,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  playlistOption: {
    flexDirection: "row",
    position: "absolute",
    left: 0,
    alignItems: "center",
  },
  button: {
    backgroundColor: COLORS.primary,
    height: 50,
    width: 130,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});
