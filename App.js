import RootNavigation from "navigation/RootNavigation";
import { store } from "redux/store";
import { Provider } from "react-redux";
import { useEffect } from "react";
import TrackPlayer from "react-native-track-player";
import BottomPlayer from "components/BottomPlayer";
import { Capability } from "react-native-track-player";

export default function App() {
  useEffect(() => {
    const setUpTrackPlayer = async () => {
      await TrackPlayer.setupPlayer();
    };

    setUpTrackPlayer().then(() => {
      TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
        notificationCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
      });
    });
  }, []);

  return (
    <Provider store={store}>
      <RootNavigation />
      <BottomPlayer />
    </Provider>
  );
}
