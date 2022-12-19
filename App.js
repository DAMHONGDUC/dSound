import OnboadingPage from "screens/onboading/OnboadingPage";
import RegisterPage from "screens/login/RegisterPage";
import SignInPage from "screens/login/SignInPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "screens/home/HomePage";
import { getData } from "helper/Helper";
import { useState, useEffect } from "react";
import SplashScreen from "react-native-splash-screen";
import {
  ONBOARDING_COMPLETE,
  ONBOARDING_STATE,
  LOGIN_TOKEN,
} from "constants/values";

const Stack = createNativeStackNavigator();

const OnboardingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Onboarding"
        component={OnboadingPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignIn"
        component={RegisterPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Home" component={HomePage} />
    </Stack.Navigator>
  );
};

const RootNavigation = () => {
  const [isSignedIn, setisSignedIn] = useState(false);
  const [isOnboardingComplete, setisOnboardingComplete] = useState(false);

  useEffect(() => {
    SplashScreen.hide();

    getData(LOGIN_TOKEN).then((value) => {
      if (value) setisSignedIn(true);
      console.log(LOGIN_TOKEN, ": ", value);
    });

    getData(ONBOARDING_STATE).then((value) => {
      if (value === ONBOARDING_COMPLETE) setisOnboardingComplete(true);
      console.log(ONBOARDING_STATE, ": ", value);
    });
  }, []);

  if (!isOnboardingComplete) {
    return <OnboardingStack></OnboardingStack>;
  }

  return (
    <Stack.Navigator>
      {isSignedIn ? (
        <Stack.Screen name="Home" component={HomePage} />
      ) : (
        <>
          {isOnboardingComplete && (
            <Stack.Screen
              name="Onboarding"
              component={OnboadingPage}
              options={{ headerShown: false }}
            />
          )}
          <Stack.Screen
            name="Register"
            component={RegisterPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignIn"
            component={RegisterPage}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigation></RootNavigation>
    </NavigationContainer>
  );
}
