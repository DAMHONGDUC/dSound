import TrackPlayer, { State } from "react-native-track-player";
import { getSongURL } from "api/SongAPI";
import {
  setCurrIndex,
  setSongURL,
  setActiveSong,
  setCurrPlaylist,
  setRepeatMode,
  setShuffleMode,
} from "redux/slices/playerSlide";
import { store } from "redux/store";
import { RepeatMode } from "react-native-track-player";
import { randomInRange } from "helper";

export default class PlayerController {
  static async updateTrackUrl(song, index) {
    const URL = await getSongURL(song.id);

    let newSong = { ...song };
    newSong.url = URL;

    await TrackPlayer.add(newSong, index);
    await TrackPlayer.remove(index + 1);

    store.dispatch(setSongURL({ index: index, url: URL }));
  }

  static updateSongData(index, currPlaylist) {
    store.dispatch(setCurrIndex(index));
    store.dispatch(setActiveSong(currPlaylist.songs[index]));
  }

  static async onPlayNew(currIndex, currPlaylist) {
    let currSong = currPlaylist.songs[currIndex];
    if (!currSong.url)
      await PlayerController.updateTrackUrl(currSong, currIndex);

    await TrackPlayer.skip(currIndex);
    await TrackPlayer.play();
  }

  static async onPlayPause(playBackState) {
    if (playBackState == State.Paused || playBackState === State.Ready) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }

  static async onNext() {
    await TrackPlayer.skipToNext();
  }

  static async onNextShuffle(currIndex, currPlaylist) {
    let random = randomInRange(0, currPlaylist.songs.length - 1);

    while (random === currIndex) {
      random = randomInRange(0, currPlaylist.songs.length - 1);
    }

    await PlayerController.onPlayNew(random, currPlaylist);
  }

  static async onShuffle(shuffleMode) {
    store.dispatch(setShuffleMode(!shuffleMode));
  }

  static async onRepeat(repeatMode) {
    if (repeatMode) {
      await TrackPlayer.setRepeatMode(RepeatMode.Off);
      store.dispatch(setRepeatMode(false));
    } else {
      await TrackPlayer.setRepeatMode(RepeatMode.Track);
      store.dispatch(setRepeatMode(true));
    }
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
