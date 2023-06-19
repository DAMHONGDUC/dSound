import { NavigationContainer } from '@react-navigation/native';
import { getData } from 'helper';
import { useState, useEffect, createRef, FC } from 'react';
import SplashScreen from 'react-native-splash-screen';
import {
  ONBOARDING_COMPLETE,
  ONBOARDING_STATE,
  LOGIN_TOKEN,
} from 'constants/values';
import AuthenticationStack from './authentication-stack';
import MainStack from './main-stack';
import OnboardingStack from './onboarding-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from 'constants/values';
import { storeData } from 'helper';
import { setRefreshLibrary } from 'stores/player/player-store';
import { useDispatch } from 'react-redux';

const RootStack = createNativeStackNavigator();
export const rootNavigationRef = createRef();

export default function RootNavigation(): JSX {
  const [isSignedIn, setisSignedIn] = useState(false);
  const [isOnboardingComplete, setisOnboardingComplete] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    SplashScreen.hide();

    getData(LOGIN_TOKEN).then(value => {
      if (value) {
        setisSignedIn(true);
      }
    });

    getData(ONBOARDING_STATE).then(value => {
      if (value === ONBOARDING_COMPLETE) {
        setisOnboardingComplete(true);
      }
    });

    // refreshLibrary
    dispatch(setRefreshLibrary(true));
  }, []);

  const handleAfterSignIn = () => {
    setisOnboardingComplete(true);
    setisSignedIn(true);
  };

  const handleAfterSignOut = async () => {
    setisSignedIn(false);

    // clear token
    await storeData(LOGIN_TOKEN, null);
  };

  return (
    <AuthContext.Provider
      value={{
        handleAfterSignIn,
        handleAfterSignOut,
      }}>
      <NavigationContainer ref={rootNavigationRef}>
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
