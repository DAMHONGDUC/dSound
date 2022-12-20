import { NavigationContainer } from "@react-navigation/native";
import { getData } from "helper";
import { useState, useEffect } from "react";
import SplashScreen from "react-native-splash-screen";
import {
  ONBOARDING_COMPLETE,
  ONBOARDING_STATE,
  LOGIN_TOKEN,
} from "constants/values";
import AuthenticationStack from "./AuthenticationStack";
import MainStack from "./MainStack";
import OnboardingStack from "./OnboardingStack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "constants/values";

const RootStack = createNativeStackNavigator();

export default function RootNavigation() {
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

  const handleAfterSignIn = () => {
    setisOnboardingComplete(true);
    setisSignedIn(true);
  };

  const handleAfterSignOut = () => {
    setisSignedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        handleAfterSignIn,
        handleAfterSignOut,
      }}
    >
      <NavigationContainer>
        <RootStack.Navigator>
          <>
            {!isOnboardingComplete && (
              <RootStack.Screen
                name="OnboardingStack"
                component={OnboardingStack}
                options={{ headerShown: false }}
              />
            )}

            {isSignedIn ? (
              <RootStack.Screen
                name="MainStack"
                component={MainStack}
                options={{ headerShown: false }}
              />
            ) : (
              <RootStack.Screen
                name="AuthenticationStack"
                component={AuthenticationStack}
                options={{ headerShown: false }}
              />
            )}
          </>
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
