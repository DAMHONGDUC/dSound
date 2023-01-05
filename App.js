import RootNavigation from "navigation/RootNavigation";
import { store } from "redux/store";
import { Provider } from "react-redux";
import { useEffect } from "react";
import TrackPlayer from "react-native-track-player";

export default function App() {
  useEffect(() => {
    const setUpTrackPlayer = async () => {
      await TrackPlayer.setupPlayer();
    };

    setUpTrackPlayer();
  }, []);

  return (
    <Provider store={store}>
      <RootNavigation></RootNavigation>
    </Provider>
  );
}
