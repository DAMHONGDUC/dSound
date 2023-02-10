import { COLORS } from "constants/theme";
import { ActivityIndicator } from "react-native";

export default function ListFooterLoading() {
  return <ActivityIndicator size="large" color={COLORS.primary} />;
}
