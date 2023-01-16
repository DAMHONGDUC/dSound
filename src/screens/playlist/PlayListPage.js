import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

export default PlayListPage = () => {
  const [dataPlayList, setdataPlayList] = useState();

  useEffect(() => {}, []);

  return (
    <View>
      <FlatList data={dataPlayList}></FlatList>
    </View>
  );
};
