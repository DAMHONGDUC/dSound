import { COLORS } from "constants/theme";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList,
} from "react-native";
import SeparateLine from "components/SeparateLine";
import ArtistRow from "screens/artist/ArtistRow";
import { get100Song, getSongById } from "api/SongAPI";
import { useEffect, useState } from "react";
import { getArtist } from "api/ArtistAPI";

const song = [];

export default function ArtistsRoute() {
  const [data100Song, setdata100Song] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getArtist();
      setdata100Song(data);
    };

    fetchData();
  }, []);

  const getSongData = async (songId) => {
    const data = await getSongById(songId);
    console.log("data bai hat", data.data);
  };

  const renderItem = ({ item }) => {
    return (
      <ArtistRow
        onClick={() => getSongData(item.encodeId)}
        image={{ uri: item.thumbnailM }}
        name={item.title}
        artist={item.artistsNames}
        duration={item.duration}
      ></ArtistRow>
    );
  };

  return (
    <View style={styles.container}>
      {data100Song ? (
        <>
          <Text style={styles.mainText}>Top {data100Song.length} artist</Text>
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
