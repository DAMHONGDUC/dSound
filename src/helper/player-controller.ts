import TrackPlayer, { State } from "react-native-track-player";
import { getSongURL } from "api/SongAPI";
import {
  setCurrIndex,
  setSongURL,
  setActiveSong,
  setCurrPlaylist,
  setRepeatMode,
  setShuffleMode,
  setCurrLovedSong,
  setRefreshLibrary,
  setReplayPlaylist,
  setInitFirstSong,
} from "stores/player/player-store";
import { store } from "stores";
import { RepeatMode } from "react-native-track-player";
import { randomInRange } from "helper";
import cloneDeep from "lodash.clonedeep";
import { FAVORITE_PLAYLIST_COLLECTION } from "constants/values";
import {
  checkSongExist,
  removeASongWithDocId,
  addSongWithDocId,
} from "api/LibraryAPI";
import { showToastAndroid } from "helper";

export default class PlayerController {
  static async updateTrackUrl(song, index) {
    const URL = await getSongURL(song.id);

    let newSong = cloneDeep(song);
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
    if (!currSong.url) {
      await PlayerController.updateTrackUrl(currSong, currIndex);
    }

    await TrackPlayer.skip(currIndex);
    await TrackPlayer.play();
  }

  static async onPlayPause(playBackState) {
    if ([State.Paused, State.Ready].includes(playBackState)) {
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

  static async onNextRepeatPlaylist(currIndex, currPlaylist) {
    if (currIndex === currPlaylist.songs.length - 1) {
      store.dispatch(setInitFirstSong(true));
      await PlayerController.onPlayNew(0, currPlaylist);
    }
  }

  static async onShuffle(shuffleMode) {
    store.dispatch(setShuffleMode(!shuffleMode));
  }

  static async onRepeat(repeatMode) {
    await TrackPlayer.setRepeatMode(
      repeatMode ? RepeatMode.Off : RepeatMode.Track
    );

    store.dispatch(setRepeatMode(!repeatMode));
  }

  static async onReplayPlaylist(replayPlaylist) {
    // await TrackPlayer.setRepeatMode(
    //   replayPlaylist ? RepeatMode.Off : RepeatMode.Queue
    // );

    store.dispatch(setReplayPlaylist(!replayPlaylist));
  }

  static async onPrevious(currIndex) {
    if (currIndex === 0) {
      await TrackPlayer.skip(0);
    } else {
      await TrackPlayer.skip(currIndex - 1);
    }

    await TrackPlayer.play();
  }

  static async onLovedSong([lovedSongId, activeSong, currLovedSong]) {
    const isExist = await checkSongExist(
      FAVORITE_PLAYLIST_COLLECTION,
      lovedSongId,
      activeSong.id
    );

    if (isExist) {
      const newLovedSong = await removeASongWithDocId(
        activeSong.id,
        lovedSongId,
        currLovedSong
      );

      store.dispatch(setCurrLovedSong(newLovedSong));

      showToastAndroid("Đã bỏ thích");
    } else {
      await addSongWithDocId(activeSong, lovedSongId);

      let newLovedSong = cloneDeep(currLovedSong);
      newLovedSong.push(activeSong);

      store.dispatch(setCurrLovedSong(newLovedSong));

      showToastAndroid("Đã thích");
    }

    store.dispatch(setRefreshLibrary(true));
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
