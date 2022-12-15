import React, { useEffect } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { COLORS, SIZES } from "constants/theme";
import {
  FacebookSocialButton,
  GoogleSocialButton,
} from "react-native-social-buttons";

export default function SignInPage() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Sign in Now!</Text>
      </View>
      <View style={styles.footer}>
        <FacebookSocialButton
          buttonText="Sign in with Facebook"
          buttonViewStyle={{
            height: 50,
            width: 250,
            marginBottom: 10,
          }}
          onPress={() => {}}
        ></FacebookSocialButton>
        <GoogleSocialButton
          buttonText="Sign in with Google"
          buttonViewStyle={{ height: 50, width: 250, borderColor: COLORS.grey }}
          onPress={() => {}}
        ></GoogleSocialButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 4,
    alignItems: "center",
    backgroundColor: COLORS.primaryBackground,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  title: {
    fontWeight: "600",
    fontSize: SIZES.h0,
    color: COLORS.white,
    marginBottom: 50,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
});
