import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SuggestedRoute from "screens/suggested/SuggestedRoute";
import SongsRoute from "screens/song/SongsRoute";
import ArtistsRoute from "screens/artist/ArtistsRoute";
import { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { COLORS } from "constants/theme";
import MainHeader from "components/MainHeader";

const TopTab = createMaterialTopTabNavigator();

export default TopTabStack = () => {
  const [tabIndex, setTabIndex] = useState(0);

  MyTabBar = ({ state, descriptors, navigation, position }) => {
    return (
      <View style={{ flexDirection: "column", height: 110 }}>
        <MainHeader></MainHeader>
        <View style={styles.tabBar}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }

              setTabIndex(index);
            };

            const onLongPress = () => {
              navigation.emit({
                type: "tabLongPress",
                target: route.key,
              });

              setTabIndex(index);
            };

            return (
              <TouchableOpacity
                key={index}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.tabItem}
              >
                <Animated.Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 16,
                    color:
                      tabIndex === index ? COLORS.black : COLORS.unSelectTab,
                  }}
                >
                  {label}
                </Animated.Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <TopTab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
      <TopTab.Screen name="Suggested" component={SuggestedRoute} />
      <TopTab.Screen name="Songs" component={SongsRoute} />
      <TopTab.Screen name="Artists" component={ArtistsRoute} />
    </TopTab.Navigator>
  );
};

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
