import React, { useEffect } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { COLORS, SIZES } from "constants/theme";
import {
  FacebookSocialButton,
  GoogleSocialButton,
} from "react-native-social-buttons";
import auth from "@react-native-firebase/auth";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId:
    "362500748669-fvb0pj0ohbas2on547ejaruh8n6mgp7a.apps.googleusercontent.com",
});

export default function RegisterPage() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Register Now!</Text>
      </View>
      <View style={styles.footer}>
        <FacebookSocialButton
          buttonText="Continue with Facebook"
          buttonViewStyle={{
            height: 50,
            width: 250,
            marginBottom: 10,
          }}
          onPress={() =>
            onFacebookButtonPress().then(() =>
              console.log("Signed in with Facebook!")
            )
          }
        ></FacebookSocialButton>
        <GoogleSocialButton
          buttonText="Continue with Google"
          buttonViewStyle={{ height: 50, width: 250, borderColor: COLORS.grey }}
          onPress={() =>
            onGoogleButtonPress().then(() =>
              console.log("Signed in with Google!")
            )
          }
        ></GoogleSocialButton>
      </View>
    </View>
  );
}

async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

async function onFacebookButtonPress() {
  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions([
    "public_profile",
    "email",
  ]);

  if (result.isCancelled) {
    throw "User cancelled the login process";
  }

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw "Something went wrong obtaining access token";
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(
    data.accessToken
  );

  // Sign-in the user with the credential
  return auth().signInWithCredential(facebookCredential);
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
