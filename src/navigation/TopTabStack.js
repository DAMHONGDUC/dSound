import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SuggestedRoute from "screens/suggested/SuggestedRoute";
import SongsRoute from "screens/song/SongsRoute";
import ArtistsRoute from "screens/artist/ArtistsRoute";

const TopTab = createMaterialTopTabNavigator();

export default TopTabStack = () => {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="SuggestedRoute" component={SuggestedRoute} />
      <TopTab.Screen name="SongsRoute" component={SongsRoute} />
      <TopTab.Screen name="ArtistsRoute" component={ArtistsRoute} />
    </TopTab.Navigator>
  );
};
