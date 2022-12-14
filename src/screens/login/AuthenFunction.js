import auth from "@react-native-firebase/auth";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { storeData } from "helper";
import { LOGIN_TOKEN } from "constants/values";
import Config from "react-native-config";

GoogleSignin.configure({
  webClientId: Config.GOOGLE_WEB_CLIENT_ID,
});

export function handleFacebookLogin(handleAfterSignIn) {
  onFacebookButtonPress().then(() => {
    handleAfterSignIn();
  });
}

export function handleGoogleLogin(handleAfterSignIn) {
  onGoogleButtonPress().then(() => {
    handleAfterSignIn();
  });
}

export async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // save token
  await storeData(LOGIN_TOKEN, idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

export async function onFacebookButtonPress() {
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

  // save token
  await storeData(LOGIN_TOKEN, data.accessToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(facebookCredential);
}
