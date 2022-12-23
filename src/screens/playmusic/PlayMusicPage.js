import { View, TouchableOpacity, StyleSheet, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS, windowWidth } from "constants/theme";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Slider from "@react-native-community/slider";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { ScrollView } from "react-native-gesture-handler";

export default PlayMusic = ({ navigation }) => {
  const HeaderSection = () => {
    return (
      <View style={styles.row}>
        <TouchableOpacity>
          <Ionicons
            onPress={() => navigation.pop()}
            name="arrow-back"
            color={COLORS.black}
            size={24}
          ></Ionicons>
        </TouchableOpacity>

        <TouchableOpacity>
          <Feather name={"more-vertical"} color={COLORS.black} size={25} />
        </TouchableOpacity>
      </View>
    );
  };

  const NameSection = () => {
    return (
      <>
        <Text numberOfLines={1} style={styles.name}>
          Star Boy
        </Text>
        <Text numberOfLines={1} style={styles.artist}>
          The Weekend, Daft Punk
        </Text>
      </>
    );
  };

  const SliderSection = () => {
    return (
      <>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor={COLORS.primary}
          maximumTrackTintColor="#000000"
          thumbTintColor={COLORS.primary}
        />
        <View style={styles.timeRow}>
          <Text style={[styles.time, { marginLeft: 17 }]}>03:35</Text>
          <Text style={[styles.time, { marginRight: 17 }]}>03:50</Text>
        </View>
      </>
    );
  };

  const LyricSection = () => {
    return (
      <View style={styles.lyricSection}>
        <Text style={styles.lyricTitle}>Lyric</Text>
        <Text style={styles.lyricText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </View>
    );
  };

  const PlaySection = () => {
    return (
      <View style={styles.playSection}>
        <TouchableOpacity>
          <MaterialIcons
            name="skip-previous"
            color={COLORS.primary}
            size={40}
          ></MaterialIcons>
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome5
            name={"play-circle"}
            color={COLORS.primary}
            size={60}
            solid
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons
            name="skip-next"
            color={COLORS.primary}
            size={40}
          ></MaterialIcons>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.conatiner}>
      <ScrollView>
        <HeaderSection></HeaderSection>
        <Image
          style={styles.image}
          source={require("assets/starboy.png")}
        ></Image>
        <NameSection></NameSection>
        <SliderSection></SliderSection>
        <PlaySection></PlaySection>
        <LyricSection></LyricSection>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  image: {
    height: windowWidth - 70,
    width: windowWidth - 70,
    borderRadius: 35,
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  name: {
    alignSelf: "center",
    color: COLORS.black,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    maxWidth: 200,
  },
  artist: {
    alignSelf: "center",
    color: COLORS.title,
    fontSize: 15,
    maxWidth: 200,
  },
  time: {
    alignSelf: "center",
    color: COLORS.title,
    fontSize: 13,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  slider: {
    alignSelf: "center",
    height: 40,
    width: windowWidth - 50,
    marginTop: 20,
  },
  playSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    alignItems: "center",
  },
  shareSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    alignItems: "center",
  },
  lyricSection: {
    backgroundColor: "#fff4e4",
    padding: 10,
    marginTop: 10,
  },
  lyricText: {
    color: COLORS.black,
    lineHeight: 30,
    fontSize: 20,
  },
  lyricTitle: {
    color: COLORS.black,
    color: COLORS.black,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
