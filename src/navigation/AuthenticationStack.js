import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterPage from "screens/login/RegisterPage";
import SignInPage from "screens/login/SignInPage";

const Stack = createNativeStackNavigator();

export default function AuthenticationStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Register"
        component={RegisterPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
