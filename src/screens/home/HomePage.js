import { COLORS } from "constants/theme";
import { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";

const SuggestedRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#ff4081" }} />
);

const SongsRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
);

const ArtistsRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#f00" }} />
);

const renderScene = SceneMap({
  suggested: SuggestedRoute,
  songs: SongsRoute,
  artists: ArtistsRoute,
});

export default function HomePage() {
  const [tabIndex, setTabIndex] = useState(0);
  const [routes] = useState([
    { key: "suggested", title: "Suggested" },
    { key: "songs", title: "Songs" },
    { key: "artists", title: "Artists" },
  ]);

  renderTabBar = (props) => {
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i, key) => {
          key = i;
          return (
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => setTabIndex(i)}
            >
              <Animated.Text
                style={{
                  fontWeight: "bold",
                  color: tabIndex == i ? COLORS.primary : COLORS.unSelectTab,
                }}
              >
                {route.title}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TabView
        navigationState={{ index: tabIndex, routes }}
        renderScene={renderScene}
        onIndexChange={setTabIndex}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
});
