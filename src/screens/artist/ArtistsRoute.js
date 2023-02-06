import { COLORS } from "constants/theme";
import { StyleSheet, View, Text, FlatList } from "react-native";
import SeparateLine from "components/SeparateLine";
import ArtistRow from "screens/artist/ArtistRow";
import { useEffect, useState } from "react";
import { getArtist } from "api/ArtistAPI";
import Loading from "components/Loading";
import { useNavigation } from "@react-navigation/native";
import { ARTIST_FLOW } from "constants/values";

export default function ArtistsRoute() {
  const [dataArtist, setdataArtist] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getArtist();
      setdataArtist(data.slice(0, 100));
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <ArtistRow
        onClick={() => {
          navigation.navigate("PlaylistPage", {
            id: item.id,
            type: ARTIST_FLOW,
            props: {
              image: item.thumbnailM,
              title: item.name,
              totalFollow: item.totalFollow,
            },
          });
        }}
        image={{ uri: item.thumbnailM }}
        name={item.name}
        totalFollow={item.totalFollow}
      />
    );
  };

  return (
    <View style={styles.container}>
      {dataArtist ? (
        <>
          <Text style={styles.mainText}>Top {dataArtist.length} artist</Text>
          <SeparateLine />
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
