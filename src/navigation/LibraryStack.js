import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LibraryPage from "screens/library/library-page";
import DetailLibraryPage from "screens/library/detail-library-page";

const Stack = createNativeStackNavigator();

export default function LibraryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LibraryPage"
        component={LibraryPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DetailLibraryPage"
        component={DetailLibraryPage}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
