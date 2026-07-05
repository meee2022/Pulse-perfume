import { Pressable, Text, StyleSheet, ViewStyle } from "react-native";
import { C, RADIUS } from "../lib/theme";

type Variant = "solid" | "olive" | "outline" | "light";

export default function Button({
  label,
  onPress,
  variant = "solid",
  style,
}: {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  style?: ViewStyle;
}) {
  const bg =
    variant === "solid" ? C.ink : variant === "olive" ? C.olive : variant === "light" ? C.white : "transparent";
  const fg = variant === "outline" ? C.ink : variant === "light" ? C.ink : C.bone;
  const border = variant === "outline" ? { borderWidth: 1, borderColor: "rgba(34,36,29,0.25)" } : null;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.btn, { backgroundColor: bg }, border, pressed && { opacity: 0.85 }, style]}
    >
      <Text style={[styles.label, { color: fg }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 26,
    paddingVertical: 15,
    borderRadius: RADIUS.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  label: { fontSize: 13, fontWeight: "600", letterSpacing: 1.4, textTransform: "uppercase" },
});
