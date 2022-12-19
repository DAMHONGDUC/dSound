import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { COLORS, SIZES } from "constants/theme";
import {
  FacebookSocialButton,
  GoogleSocialButton,
} from "react-native-social-buttons";
import { onFacebookButtonPress, onGoogleButtonPress } from "./AuthenFunction";

export default function RegisterPage({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Register Now!</Text>
      </View>
      <View style={styles.footer}>
        <FacebookSocialButton
          buttonText="Register with Facebook"
          buttonViewStyle={{
            height: 50,
            width: 250,
            marginBottom: 10,
          }}
          onPress={() =>
            onFacebookButtonPress().then(() => {
              console.log("Register complete with Facebook!");
              navigation.navigate("Home");
            })
          }
        ></FacebookSocialButton>
        <GoogleSocialButton
          buttonText="Register with Google"
          buttonViewStyle={{ height: 50, width: 250, borderColor: COLORS.grey }}
          onPress={() =>
            onGoogleButtonPress().then(() => {
              console.log("Register complete with Google!");
              navigation.navigate("Home");
            })
          }
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
});
