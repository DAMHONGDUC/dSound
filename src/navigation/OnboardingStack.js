import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboadingPage from "screens/onboading/OnboadingPage";

const Stack = createNativeStackNavigator();

export default function OnboardingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Onboarding"
        component={OnboadingPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
