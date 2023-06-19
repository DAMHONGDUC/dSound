import RootNavigation from "navigation/RootNavigation";
import { store } from "stores";
import { Provider } from "react-redux";
import { useEffect } from "react";
import TrackPlayer from "react-native-track-player";
import BottomPlayer from "components/BottomPlayer";
import { Capability } from "react-native-track-player";
import ErrorBoundary from "components/ErrorBoundary";

export default function App() {
  const options = [
    Capability.Play,
    Capability.Pause,
    Capability.SkipToNext,
    Capability.SkipToPrevious,
    Capability.SeekTo,
  ];

  useEffect(() => {
    const setUpTrackPlayer = async () => {
      await TrackPlayer.setupPlayer();
    };

    setUpTrackPlayer().then(() => {
      TrackPlayer.updateOptions({
        capabilities: options,
        compactCapabilities: options,
        notificationCapabilities: options,
      });
    });
  }, []);

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <RootNavigation />
        <BottomPlayer />
      </Provider>
    </ErrorBoundary>
  );
}
