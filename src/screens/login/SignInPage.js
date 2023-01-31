import React, { useContext } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { handleFacebookLogin, handleGoogleLogin } from "./AuthenFunction";
import { COLORS, SIZES } from "constants/theme";
import {
  FacebookSocialButton,
  GoogleSocialButton,
} from "react-native-social-buttons";
import { AuthContext } from "constants/values";

export default function SignInPage({ navigation }) {
  const { handleAfterSignIn } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#0081C9"} barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.title}>Sign in Now!</Text>
      </View>

      <View style={styles.footer}>
        <FacebookSocialButton
          buttonText="Sign in with Facebook"
          buttonViewStyle={styles.btnFBtyle}
          onPress={() => handleFacebookLogin(handleAfterSignIn)}
        ></FacebookSocialButton>
        <GoogleSocialButton
          buttonText="Sign in with Google"
          buttonViewStyle={styles.btnGGtyle}
          onPress={() => handleGoogleLogin(handleAfterSignIn)}
        ></GoogleSocialButton>

        <Text style={styles.textLink}>
          I'm a new member.
          <Text
            style={styles.textLinkRight}
            onPress={() => navigation.navigate("Register")}
          >
            {" "}
            Register
          </Text>
        </Text>
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
    backgroundColor: "#0081C9",
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
  btnFBtyle: {
    height: 50,
    width: 250,
    marginBottom: 10,
  },
  btnGGtyle: {
    height: 50,
    width: 250,
    borderColor: COLORS.grey,
    marginBottom: 20,
  },
  textLink: {
    color: "#000000",
    fontSize: 14,
  },
  textLinkRight: {
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: 15,
  },
});
