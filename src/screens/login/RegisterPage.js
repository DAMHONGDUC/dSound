import { useContext } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { COLORS, SIZES } from "constants/theme";
import {
  FacebookSocialButton,
  GoogleSocialButton,
} from "react-native-social-buttons";
import { handleFacebookLogin, handleGoogleLogin } from "./AuthenFunction";
import { AuthContext } from "constants/values";

export default function RegisterPage({ navigation }) {
  const { handleAfterSignIn } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.title}>Register Now!</Text>
      </View>

      <View style={styles.footer}>
        <FacebookSocialButton
          buttonText="Register with Facebook"
          buttonViewStyle={styles.btnFBtyle}
          onPress={() => handleFacebookLogin(handleAfterSignIn)}
        />
        <GoogleSocialButton
          buttonText="Register with Google"
          buttonViewStyle={styles.btnGGtyle}
          onPress={() => handleGoogleLogin(handleAfterSignIn)}
        />

        <Text style={styles.textLink}>
          I'm already a member.
          <Text
            style={styles.textLinkRight}
            onPress={() => navigation.navigate("SignIn")}
          >
            {" "}
            Sign In
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
    backgroundColor: COLORS.primary,
  },
  title: {
    fontWeight: "600",
    fontSize: SIZES.h0,
    color: COLORS.white,
    marginBottom: 50,
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
