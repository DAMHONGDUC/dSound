import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { View, TouchableOpacity, StyleSheet, BackHandler } from 'react-native';
import { COLORS } from 'constants/theme';
import { useDispatch, useSelector } from 'react-redux';
import { setShowBottomPlay } from 'stores/player/player-store';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { useState } from 'react';
import PopUpSongOptions from 'components/pop-up-song-options';

export default function HeaderSection() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [showPopover, setShowPopover] = useState(false);
  const { activeSong } = useSelector(state => state.player);

  const handleBackButton = () => {
    navigation.pop();
    dispatch(setShowBottomPlay(true));
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        dispatch(setShowBottomPlay(true));
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => subscription.remove();
    }, []),
  );

  return (
    <View style={styles.row}>
      <View style={styles.view}>
        <TouchableOpacity>
          <MaterialIcons
            onPress={handleBackButton}
            name="expand-more"
            color={COLORS.black}
            size={35}
          />
        </TouchableOpacity>
      </View>
      <PopUpSongOptions
        showPopover={showPopover}
        setShowPopover={setShowPopover}
        currSongRow={activeSong}
      />

      <View style={styles.view}>
        <TouchableOpacity onPress={() => setShowPopover(true)}>
          <Feather name={'more-vertical'} color={COLORS.black} size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  view: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popupContainer: {
    flexDirection: 'column',
    height: 130,
    width: 230,
    justifyContent: 'space-evenly',
  },
  popupRow: {
    flexDirection: 'row',
    marginLeft: 15,
    alignItems: 'center',
  },
  popupText: {
    marginLeft: 5,
    color: COLORS.black,
    fontSize: 18,
  },
});
