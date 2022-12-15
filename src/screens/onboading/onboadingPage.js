import React, { useState, useEffect } from "react";
import { View, Text, Image, StatusBar, StyleSheet } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { COLORS, SIZES, windowWidth, windowHeight } from "constants/theme";
import SplashScreen from "react-native-splash-screen";
import Onboading1 from "assets/Onboarding1.svg";
import Onboading2 from "assets/Onboarding2.svg";
import Onboading3 from "assets/Onboarding3.svg";

const slides = [
  {
    id: 1,
    title: "Music in life",
    description: "Balances you emotions and make you feel happy.",
  },
  {
    id: 2,
    title: "Enjoy music",
    description:
      "Massive music for you to listen to, enjoy each moment of music.",
  },
  {
    id: 3,
    title: "Without ads",
    description: "Enjoy your music without ads and keep listening it.",
  },
];

function OnboardingFile(type) {
  height = 500;
  width = 0;
  switch (type) {
    case 1:
      return (
        <Onboading1
          width={windowWidth - width}
          height={windowHeight - height}
        ></Onboading1>
      );
    case 2:
      return (
        <Onboading2
          width={windowWidth - width}
          height={windowHeight - height}
        ></Onboading2>
      );
    case 3:
      return (
        <Onboading3
          width={windowWidth - width}
          height={windowHeight - height}
        ></Onboading3>
      );
  }
}

export default function OnboadingPage() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const buttonLabel = (label) => {
    return (
      <View style={styles.button}>
        <Text style={styles.buttonText}>{label}</Text>
      </View>
    );
  };

  return (
    <AppIntroSlider
      data={slides}
      renderItem={({ item }) => {
        return (
          <View style={styles.container}>
            {OnboardingFile(item.id)}
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        );
      }}
      activeDotStyle={{
        backgroundColor: COLORS.primary,
        width: 30,
      }}
      showSkipButton
      renderNextButton={() => buttonLabel("Next")}
      renderSkipButton={() => buttonLabel("Skip")}
      renderDoneButton={() => buttonLabel("Done")}
      onDone={() => {}}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: COLORS.white,
  },
  image: { width: SIZES.width, height: 400 },
  title: {
    fontWeight: "900",
    color: COLORS.primary,
    fontSize: SIZES.h1,
  },
  description: {
    textAlign: "center",
    paddingTop: 5,
    color: COLORS.title,
    maxWidth: 250,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    fontWeight: "900",
  },
  buttonText: {
    color: COLORS.title,
    fontSize: SIZES.h4,
  },
});
