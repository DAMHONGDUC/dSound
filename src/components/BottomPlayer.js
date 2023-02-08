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
import TrackPlayer, {
  Event,
  usePlaybackState,
  useTrackPlayerEvents,
  useProgress,
  State,
} from "react-native-track-player";
import { useDispatch } from "react-redux";
import {
  setCurrIndex,
  setActiveSong,
  setUpdateNearlySong,
  setInitFirstSong,
} from "redux/slices/playerSlide";

export default function BottomPlayer() {
  const {
    activeSong,
    showBottomPlay,
    currPlaylist,
    repeatMode,
    shuffleMode,
    currIndex,
    updateNearlySong,
    initFirstSong,
    lovedSongId,
    currLovedSong,
  } = useSelector((state) => state.player);

  const progress = useProgress();
  const [progressBar, setprogressBar] = useState(0);
  const playBackState = usePlaybackState();
  const dispatch = useDispatch();

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
      console.log(event);

      let index = event.nextTrack;
      dispatch(setUpdateNearlySong(true));

      // dispatch(setCurrIndex(playlistPlayButtonClicked ? 0 : index));
      // dispatch(
      //   setActiveSong(currPlaylist.songs[playlistPlayButtonClicked ? 0 : index])
      // );

      // if (playlistPlayButtonClicked) {
      //   dispatch(setPlaylistPlayButtonClicked(false));
      // }

      if (index !== 0) {
        dispatch(setCurrIndex(index));
        dispatch(setActiveSong(currPlaylist.songs[index]));
      } else if (initFirstSong) {
        dispatch(setCurrIndex(0));
        dispatch(setActiveSong(currPlaylist.songs[0]));
      }
    }
  });

  const helperUpdateNearlySong = async (flag, playlist, index) => {
    if (flag) {
      let song = playlist.songs[index];

      if (!song.url) {
        await PlayerController.updateTrackUrl(song, index);
      }
    }
  };

  useTrackPlayerEvents([Event.PlaybackState], async (event) => {
    if (event.type === Event.PlaybackState) {
      if (initFirstSong) {
        await TrackPlayer.play();
      }
    }
  });

  const handleReadyStatus = async () => {
    if (initFirstSong) {
      await TrackPlayer.play();
    }
  };

  const handlePlayingStatus = async () => {
    if (updateNearlySong) {
      let index = currIndex;

      await helperUpdateNearlySong(index - 1 >= 1, currPlaylist, index - 1);
      await helperUpdateNearlySong(
        index + 1 <= currPlaylist.songs.length - 1,
        currPlaylist,
        index + 1
      );

      dispatch(setUpdateNearlySong(false));
    }

    if (initFirstSong) {
      dispatch(setInitFirstSong(false));
    }
  };

  useTrackPlayerEvents([Event.PlaybackState], async (event) => {
    if (event.type === Event.PlaybackState && event.state === State.Playing) {
      switch (event.state) {
        case State.Playing:
          await handlePlayingStatus();
          break;
        case State.Ready:
          await handleReadyStatus();
          break;
      }
    }
  });

  useEffect(() => {
    const listenTrackEnd = async () => {
      if (playBackState === State.Playing) {
        const sec = Math.floor(progress.position / 1);

        if (
          (sec === activeSong.duration || sec + 1 === activeSong.duration) &&
          !repeatMode
        ) {
          if (shuffleMode) {
            PlayerController.onNextShuffle(currIndex, currPlaylist);
          } else {
            PlayerController.onNext();
          }
        }

        setprogressBar((sec / activeSong.duration) * 100);
      }
    };

    listenTrackEnd();
  }, [progress.position]);

  const handlePlayPause = () => {
    PlayerController.onPlayPause(playBackState);
  };

  const handleBottomPlayerClick = () => {
    rootNavigationRef.current?.navigate("MainStack", {
      screen: "PlayMusicPage",
      params: { currSongId: activeSong.id },
    });
  };

  const handleLovedSong = async () => {
    await PlayerController.onLovedSong([
      lovedSongId,
      activeSong,
      currLovedSong,
    ]);
  };

  const getLovedStatus = (songid) => {
    if (currLovedSong) {
      return currLovedSong.some((e) => e.id === songid);
    }
  };

  return (
    showBottomPlay && (
      <View style={styles.constainer}>
        <TouchableHighlight onPress={handleBottomPlayerClick}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["#205295", "#0A2647", "#1A120B"]}
          >
            <View style={[styles.progress, { width: `${progressBar}%` }]} />
            <View style={styles.row}>
              <View style={styles.row2}>
                <Image
                  style={styles.image}
                  source={{ uri: activeSong.artwork }}
                />
                <View style={styles.titleSection}>
                  <Text numberOfLines={1}>{activeSong.title}</Text>
                  <Text numberOfLines={1}>{activeSong.artist}</Text>
                </View>
              </View>

              <View style={styles.row3}>
                <TouchableOpacity
                  onPress={handleLovedSong}
                  style={styles.button}
                >
                  <FontAwesome5
                    name={"heart"}
                    color={
                      getLovedStatus(activeSong.id)
                        ? COLORS.primary
                        : COLORS.white
                    }
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
}

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
