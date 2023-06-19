import { COLORS } from 'constants/theme';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import SeparateLine from 'components/separate-line';
import SongRow from 'screens/song/song-row';
import { get100Song } from 'api/SongAPI';
import { useEffect, useState } from 'react';
import Loading from 'components/Loading';
import PlayerController from 'helper/player-controller';
import { useSelector } from 'react-redux';
import { pushMoreDataPlaylist, sleep } from 'helper';
import ListFooterLoading from 'components/list-footer-loading';
import cloneDeep from 'lodash.clonedeep';

export default function SongsRoute({ navigation }) {
  const [data100Song, setdata100Song] = useState();
  const [currShowingData, setCurrShowingData] = useState({});
  const { showBottomPlay, currPlaylist } = useSelector(state => state.player);
  const [loadingMore, setLoadingMore] = useState(false);
  const delay = 1;
  const endOfData =
    currShowingData?.songs?.length === data100Song?.songs?.length;

  useEffect(() => {
    const fetchData = async () => {
      const data = await get100Song();

      setdata100Song(data);

      const newData = pushMoreDataPlaylist(
        data,
        { id: data.id, songs: [] },
        20,
      );
      setCurrShowingData(cloneDeep(newData));
    };

    fetchData();
  }, []);

  const renderItem = ({ item, index }) => {
    return (
      <SongRow
        onClick={() =>
          PlayerController.onSongRowClick([
            currPlaylist,
            data100Song,
            index,
            item.id,
            navigation,
          ])
        }
        image={{ uri: item.artwork }}
        name={item.title}
        artist={item.artist}
        duration={item.duration}
        id={item.id}
        item={item}
        index={index}
        status={data100Song.id === currPlaylist.id}
      />
    );
  };

  const handleOnEndReached = async () => {
    if (!endOfData) {
      setLoadingMore(true);

      await sleep(delay * 1000);

      const newData = pushMoreDataPlaylist(data100Song, currShowingData, 20);
      setCurrShowingData(cloneDeep(newData));

      setLoadingMore(false);
    }
  };

  return (
    <View style={[styles.container, { marginBottom: showBottomPlay ? 60 : 0 }]}>
      {data100Song ? (
        <>
          <Text style={styles.mainText}>
            Top {data100Song.songs.length} song
          </Text>
          <SeparateLine />

          <FlatList
            data={currShowingData.songs}
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
  container2: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal2: {
    padding: 0,
  },
});
