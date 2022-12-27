import { COLORS } from "constants/theme";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList,
} from "react-native";
import SeparateLine from "components/SeparateLine";
import SongRow from "screens/song/SongRow";
import { get100Song, getSongById } from "api/SongAPI";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  activeSong,
  setCurrPlaylist,
  setCurrIndex,
} from "redux/slices/playerSlide";

export default function SongsRoute({ navigation }) {
  const [data100Song, setdata100Song] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const data = await get100Song();
      setdata100Song(data);
      dispatch(setCurrPlaylist(data));
    };

    fetchData();
  }, []);

  const getSongData = async (item, index) => {
    const data = await getSongById(item.encodeId);
    dispatch(setCurrIndex(index));
    const song = {
      ...item,
      link: data.data["128"],
    };

    dispatch(activeSong(song));
    navigation.navigate("PlayMusicPage");
  };

  const renderItem = ({ item, index }) => {
    return (
      <SongRow
        onClick={() => getSongData(item, index)}
        image={{ uri: item.thumbnailM }}
        name={item.title}
        artist={item.artistsNames}
        duration={item.duration}
      ></SongRow>
    );
  };

  return (
    <View style={styles.container}>
      {data100Song ? (
        <>
          <Text style={styles.mainText}>Top {data100Song.length} song</Text>
          <SeparateLine></SeparateLine>
          <FlatList
            data={data100Song}
            renderItem={renderItem}
            keyExtractor={(item) => item.encodeId}
          />
        </>
      ) : (
        <ActivityIndicator
          style={{ alignSelf: "center" }}
          size={"large"}
          color={COLORS.primary}
        ></ActivityIndicator>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 15,
  },
  mainText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
});
