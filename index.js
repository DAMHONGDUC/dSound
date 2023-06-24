/**
 * @format
 */

import './shim';
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { PlaybackService } from 'services/PlaybackService';
import TrackPlayer from 'react-native-track-player';

AppRegistry.registerComponent(appName, () => App);

TrackPlayer.registerPlaybackService(() => PlaybackService);
