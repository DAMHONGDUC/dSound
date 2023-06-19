import { StyleSheet, SafeAreaView } from 'react-native';
import TopTabStack from 'navigation/top-tab-stack';

export default function HomePage() {
  return (
    <SafeAreaView style={styles.container}>
      <TopTabStack />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
