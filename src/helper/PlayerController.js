import TrackPlayer, { State } from "react-native-track-player";
import { getSongURL } from "api/SongAPI";
import { cloneDeep } from "lodash";
import {
  setCurrIndex,
  setSongURL,
  setActiveSong,
  setIsPlaying,
  setCurrPlaylist,
  setShowBottomPlay,
} from "redux/slices/playerSlide";
import { store } from "redux/store";

export default class PlayerController {
  static async setUpSongURL(index, currPlaylist) {
    let currSong = cloneDeep(currPlaylist.songs[index]);

    if (index !== 0 && !currSong.url) {
      const URL = await getSongURL(currPlaylist.songs[index].id);
      currSong.url = URL;

      store.dispatch(setSongURL({ index: index, url: URL }));

      await TrackPlayer.add(currSong, index);
      await TrackPlayer.remove(index + 1);
    }
  }

  static async onPlayNew(currIndex, currPlaylist) {
    await PlayerController.setUpSongURL(currIndex, currPlaylist);
    await TrackPlayer.skip(currIndex);
    await TrackPlayer.play();

    store.dispatch(setActiveSong(currPlaylist.songs[currIndex]));
    store.dispatch(setIsPlaying(true));
  }

  static async onPlayPause(isPlaying) {
    if (isPlaying) {
      await TrackPlayer.pause();
      store.dispatch(setIsPlaying(false));
    } else {
      await TrackPlayer.play();
      store.dispatch(setIsPlaying(true));
    }
  }

  static async onNext(currIndex, currPlaylist) {
    await PlayerController.setUpSongURL(currIndex + 1, currPlaylist);
    await TrackPlayer.skip(currIndex + 1);
    await TrackPlayer.play();

    store.dispatch(setCurrIndex(currIndex + 1));
    store.dispatch(setActiveSong(currPlaylist.songs[currIndex + 1]));
    store.dispatch(setIsPlaying(true));
  }

  static async onPrevious(currIndex, currPlaylist) {
    if (currIndex >= 1) {
      await PlayerController.setUpSongURL(currIndex - 1, currPlaylist);
      await TrackPlayer.skip(currIndex - 1);
      await TrackPlayer.play();

      store.dispatch(setCurrIndex(currIndex - 1));
      store.dispatch(setActiveSong(currPlaylist.songs[currIndex - 1]));
      store.dispatch(setIsPlaying(true));
    }
  }

  static async resetTrackPlayer() {
    const tracks = await TrackPlayer.getQueue();

    if (tracks.length > 0) {
      await TrackPlayer.pause();
      await TrackPlayer.reset();
    }
  }

  static async onSongRowClick(
    currPlaylist,
    data,
    index,
    currSongId,
    navigation
  ) {
    if (currPlaylist.id !== data.id) {
      await PlayerController.resetTrackPlayer();

      store.dispatch(setCurrPlaylist(data));

      await TrackPlayer.add(data.songs);
    }

    store.dispatch(setCurrIndex(index));

    navigation.navigate("PlayMusicPage", { currSongId: currSongId });
  }
}
