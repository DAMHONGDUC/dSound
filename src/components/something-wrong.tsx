import { COLORS } from 'constants/theme';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { BackHandler } from 'react-native';

export default function SomethingWrong() {
  const onPress = () => {
    BackHandler.exitApp();
  };

  return (
    <View style={styles.container}>
      <MaterialIcons name={'error'} color={COLORS.primary} size={60} />
      <Text style={styles.mainText}>Some thing went wrong...</Text>
      <Text style={styles.subText}>We are going to fix it. Try later.</Text>
      <TouchableHighlight
        underlayColor={COLORS.white}
        style={styles.button}
        onPress={onPress}>
        <Text style={[styles.subText, { color: '#5BC0F8', fontSize: 20 }]}>
          Exit
        </Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    marginTop: 10,
    fontSize: 20,
    color: COLORS.black,
    fontWeight: '500',
  },
  subText: {
    marginTop: 10,
    fontSize: 15,
    color: COLORS.title,
    fontWeight: '500',
  },
  button: {
    marginTop: 50,
  },
});
