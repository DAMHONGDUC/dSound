import React, { useEffect } from "react";
import { View, Text } from "react-native";
import SplashScreen from "react-native-splash-screen";

export default function SplashPage() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View>
      <Text>hesslloggfsg</Text>
    </View>
  );
}
