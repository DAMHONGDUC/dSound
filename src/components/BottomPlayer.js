import { COLORS } from "constants/theme";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { useSelector } from "react-redux";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Fontisto from "react-native-vector-icons/Fontisto";
import LinearGradient from "react-native-linear-gradient";
import PlayerController from "helper/PlayerController";
import { useEffect, useState } from "react";
import { rootNavigationRef } from "navigation/RootNavigation";
import {
  Event,
  usePlaybackState,
  useTrackPlayerEvents,
  useProgress,
  State,
} from "react-native-track-player";
import cloneDeep from "lodash.clonedeep";

export default BottomPlayer = () => {
  const { activeSong, showBottomPlay, currPlaylist, currIndex } = useSelector(
    (state) => state.player
  );

  const progress = useProgress();
  const isEmpty = Object.keys(activeSong).length === 0;
  const [progressBar, setprogressBar] = useState(0);
  const playBackState = usePlaybackState();

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
      let index = event.nextTrack;
      PlayerController.updateSongData(index, currPlaylist);

      if (index === 0) {
        let nextSong = cloneDeep(currPlaylist.songs[index + 1]);

        if (!nextSong.url)
          await PlayerController.updateTrackUrl(nextSong, index + 1);
      } else {
        let preSong = cloneDeep(currPlaylist.songs[index - 1]);
        let nextSong = cloneDeep(currPlaylist.songs[index + 1]);

        if (!preSong.url)
          await PlayerController.updateTrackUrl(preSong, index - 1);

        if (!nextSong.url)
          await PlayerController.updateTrackUrl(nextSong, index + 1);
      }
    }
  });

  useEffect(() => {
    const listenTrackEnd = async () => {
      if (playBackState === State.Playing) {
        const sec = Math.floor(progress.position / 1);

        if (sec === activeSong.duration || sec + 1 === activeSong.duration) {
          PlayerController.onNext(currIndex, currPlaylist);
        }

        setprogressBar((sec / activeSong.duration) * 100);
      }
    };

    listenTrackEnd();
  }, [progress.position]);

  const handlePlayPause = () => {
    PlayerController.onPlayPause(playBackState === State.Playing);
  };

  const handleBottomPlayerClick = () => {
    rootNavigationRef.current?.navigate("MainStack", {
      screen: "PlayMusicPage",
      params: { currSongId: activeSong.id },
    });
  };

  return (
    !isEmpty &&
    showBottomPlay && (
      <View style={styles.constainer}>
        <TouchableHighlight onPress={handleBottomPlayerClick}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["#205295", "#0A2647", "#1A120B"]}
          >
            <View
              style={[styles.progress, { width: `${progressBar}%` }]}
            ></View>
            <View style={styles.row}>
              <View style={styles.row2}>
                <Image
                  style={styles.image}
                  source={{ uri: activeSong.artwork }}
                ></Image>
                <View style={styles.titleSection}>
                  <Text numberOfLines={1}>{activeSong.title}</Text>
                  <Text numberOfLines={1}>{activeSong.artist}</Text>
                </View>
              </View>

              <View style={styles.row3}>
                <TouchableOpacity style={styles.button}>
                  <FontAwesome5
                    name={"heart"}
                    color={COLORS.white}
                    size={23}
                    solid
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, { marginRight: 5 }]}
                  onPress={handlePlayPause}
                >
                  {playBackState === State.Playing ? (
                    <Fontisto
                      name={"pause"}
                      color={COLORS.white}
                      size={22}
                      solid
                    />
                  ) : (
                    <FontAwesome5
                      name={"play"}
                      color={COLORS.white}
                      size={22}
                      solid
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </TouchableHighlight>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  constainer: {
    backgroundColor: COLORS.grey,
    position: "absolute",
    bottom: 55,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 7,
  },
  row2: {
    flexDirection: "row",
  },
  row3: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
  },
  image: {
    width: 45,
    height: 45,
    marginLeft: 5,
  },
  progress: {
    height: 3,
    backgroundColor: COLORS.orange,
  },
  titleSection: {
    marginLeft: 10,
    flexDirection: "column",
    justifyContent: "space-around",
    maxWidth: 180,
  },
  button: {
    //backgroundColor: COLORS.yellow,
    width: 60,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
});
