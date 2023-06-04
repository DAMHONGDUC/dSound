import { COLORS } from "constants/theme";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Keyboard,
  Button,
} from "react-native";
import SongRow from "screens/song/SongRow";
import Loading from "components/Loading";
import PlayerController from "helper/PlayerController";
import { useSelector } from "react-redux";
import { searchSongByName } from "api/SongAPI";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useState } from "react";

export default function Example() {
  const [name, setUser] = useState("");
  const [show, setShow] = useState(false);

  return (
    <View>
      <TextInput value={name} onChangeText={setUser} testID="input" />
      <Button
        title="Print Username"
        onPress={() => {
          // let's pretend this is making a server request, so it's async
          // (you'd want to mock this imaginary request in your unit tests)...
          setTimeout(() => {
            setShow(true);
          }, Math.floor(Math.random() * 200));
        }}
      />
      {show && <Text testID="printed-username">{name}</Text>}
    </View>
  );
}
