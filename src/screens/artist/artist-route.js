import { COLORS } from 'constants/theme';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import SeparateLine from 'components/separate-line';
import ArtistRow from 'screens/artist/artist-row';
import { useEffect, useState } from 'react';
import { getArtist } from 'api/ArtistAPI';
import Loading from 'components/Loading';
import { useNavigation } from '@react-navigation/native';
import { ARTIST_FLOW } from 'constants/values';
import { useSelector } from 'react-redux';
import { pushMoreDataArtist, sleep } from 'helper';
import ListFooterLoading from 'components/list-footer-loading';
import cloneDeep from 'lodash.clonedeep';

export default function ArtistsRoute() {
  const [dataArtist, setdataArtist] = useState();
  const navigation = useNavigation();
  const { showBottomPlay } = useSelector(state => state.player);
  const [currShowingData, setCurrShowingData] = useState({});
  const [loadingMore, setLoadingMore] = useState(false);
  const delay = 1;
  const endOfData = currShowingData?.length === dataArtist?.length;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getArtist();
      const dataSlice = data.slice(0, 100);
      setdataArtist(dataSlice);

      const newData = pushMoreDataArtist(dataSlice, [], 20);
      setCurrShowingData(cloneDeep(newData));
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <ArtistRow
        onClick={() => {
          navigation.navigate('PlaylistPage', {
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

  const handleOnEndReached = async () => {
    if (!endOfData) {
      setLoadingMore(true);

      await sleep(delay * 1000);

      const newData = pushMoreDataArtist(dataArtist, currShowingData, 20);
      setCurrShowingData(cloneDeep(newData));

      setLoadingMore(false);
    }
  };

  return (
    <View style={[styles.container, { marginBottom: showBottomPlay ? 60 : 0 }]}>
      {dataArtist ? (
        <>
          <Text style={styles.mainText}>Top {dataArtist.length} artist</Text>
          <SeparateLine />
          <FlatList
            data={currShowingData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            onEndReachedThreshold={0.5}
            onEndReached={handleOnEndReached}
            ListFooterComponent={() => loadingMore && <ListFooterLoading />}
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
    paddingLeft: 15,
    paddingRight: 15,
  },
  mainText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
