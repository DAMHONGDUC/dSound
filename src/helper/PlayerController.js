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
  static async updateTrackUrl(song, index) {
    const URL = await getSongURL(song.id);
    song.url = URL;

    await TrackPlayer.add(song, index);
    await TrackPlayer.remove(index + 1);

    store.dispatch(setSongURL({ index: index, url: URL }));
  }

  static updateSongData(index, currPlaylist) {
    store.dispatch(setCurrIndex(index));
    store.dispatch(setActiveSong(currPlaylist.songs[index]));
  }

  static async onPlayNew(currIndex) {
    await TrackPlayer.skip(currIndex);
    await TrackPlayer.play();
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

  static async onNext() {
    await TrackPlayer.skipToNext();
  }

  static async onPrevious(currIndex) {
    if (currIndex === 0) await TrackPlayer.skip(0);
    else await TrackPlayer.skip(currIndex - 1);

    await TrackPlayer.play();
  }

  static async resetTrackPlayer() {
    const tracks = await TrackPlayer.getQueue();

    if (tracks.length > 0) {
      await TrackPlayer.pause();
      await TrackPlayer.reset();
    }
  }

  static async onSongRowClick([
    currPlaylist,
    data,
    index,
    currSongId,
    navigation,
  ]) {
    if (currPlaylist.id !== data.id) {
      await PlayerController.resetTrackPlayer();

      store.dispatch(setCurrPlaylist(data));

      await TrackPlayer.add(data.songs);
    }

    store.dispatch(setCurrIndex(index));

    navigation.navigate("PlayMusicPage", { currSongId: currSongId });
  }
}
