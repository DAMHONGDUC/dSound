import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabStack from "./BottomTabStack";
import MainTitle from "components/MainTitle";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabStack"
        component={BottomTabStack}
        options={{
          headerTitle: () => <MainTitle />,
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
