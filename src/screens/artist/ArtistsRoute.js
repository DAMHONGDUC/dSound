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
import { useEffect, useState } from "react";
import { getArtist } from "api/ArtistAPI";
import Loading from "components/Loading";

const song = [];

export default function ArtistsRoute() {
  const [dataArtist, setdataArtist] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getArtist();
      setdataArtist(data);
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <ArtistRow
        onClick={() => {}}
        image={{ uri: item.thumbnailM }}
        name={item.name}
        totalFollow={item.totalFollow}
      ></ArtistRow>
    );
  };

  return (
    <View style={styles.container}>
      {dataArtist ? (
        <>
          <Text style={styles.mainText}>Top {dataArtist.length} artist</Text>
          <SeparateLine></SeparateLine>
          <FlatList
            data={dataArtist}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </>
      ) : (
        <Loading />
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
