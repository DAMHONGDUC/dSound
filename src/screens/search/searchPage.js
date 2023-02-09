import { COLORS } from "constants/theme";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Keyboard,
} from "react-native";
import SongRow from "screens/song/SongRow";
import Loading from "components/Loading";
import PlayerController from "helper/PlayerController";
import { useSelector } from "react-redux";
import { searchSongByName } from "api/SongAPI";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useState } from "react";

export default function SongsRoute({ navigation }) {
  const [dataSearch, setdataSearch] = useState([]);
  const { currPlaylist } = useSelector((state) => state.player);
  const [searchText, setsearchText] = useState("");
  const [notiText, setnotiText] = useState("không có kết quả !");

  const onSearch = async () => {
    if (searchText.length > 0) {
      setdataSearch(null);

      const data = await searchSongByName(searchText);

      setdataSearch(data ?? []);
      setnotiText(data ?? "không có kết quả !");

      Keyboard.dismiss();
    }
  };

  const onChangeTextInput = (text) => {
    setsearchText(text);
    setnotiText("");

    if (text.length === 0) {
      setdataSearch([]);
      setnotiText("không có kết quả !");
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <SongRow
        onClick={() =>
          PlayerController.onSongRowClick([
            currPlaylist,
            dataSearch,
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
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tìm kiếm</Text>
      <View style={styles.searchSection}>
        <TextInput
          style={styles.textInput}
          placeholder="Bạn muốn nghe gì?"
          placeholderTextColor={COLORS.grey}
          onChangeText={onChangeTextInput}
          onSubmitEditing={onSearch}
        />
        <TouchableOpacity onPress={onSearch} style={styles.searchIcon}>
          <AntDesign name="search1" size={30} color={COLORS.black} />
        </TouchableOpacity>
      </View>
      {dataSearch ? (
        <FlatList
          data={dataSearch.songs}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Text style={styles.notiText}>{notiText}</Text>}
        />
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
    padding: 20,
  },

  textInput: {
    color: COLORS.black,
    backgroundColor: COLORS.white,
    borderColor: COLORS.white,
    borderWidth: 1.5,
    borderRadius: 7,
    fontSize: 17,
    width: "87%",
  },
  text: {
    fontSize: 20,
    color: COLORS.black,
    fontWeight: "500",
  },
  searchSection: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    borderWidth: 1.5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 7,
    borderColor: COLORS.black,
  },
  searchIcon: {
    alignSelf: "center",
  },
  notiText: {
    color: COLORS.primary,
  },
});
