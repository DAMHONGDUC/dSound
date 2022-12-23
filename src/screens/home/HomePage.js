import { COLORS } from "constants/theme";
import { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { TabView } from "react-native-tab-view";
import SuggestedRoute from "../suggested/SuggestedRoute";
import SongsRoute from "../song/SongsRoute";
import ArtistsRoute from "../artist/ArtistsRoute";

export default function HomePage({ navigation }) {
  const [tabIndex, setTabIndex] = useState(0);
  const [routes] = useState([
    { key: "suggested", title: "Suggested" },
    { key: "songs", title: "Songs" },
    { key: "artists", title: "Artists" },
  ]);

  renderScene = ({ route }) => {
    switch (route.key) {
      case "suggested":
        return <SuggestedRoute navigation={navigation} />;
      case "songs":
        return <SongsRoute navigation={navigation} />;
      case "artists":
        return <ArtistsRoute navigation={navigation} />;
      default:
        return null;
    }
  };

  renderTabBar = (props) => {
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity
              key={i}
              style={styles.tabItem}
              onPress={() => setTabIndex(i)}
            >
              <Animated.Text
                style={{
                  fontWeight: "bold",
                  color: tabIndex == i ? COLORS.primary : COLORS.unSelectTab,
                  fontSize: 16,
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
