import { Pressable, View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { C } from "../lib/theme";
import { useCart } from "../lib/cart";

export default function CartButton() {
  const router = useRouter();
  const count = useCart((s) => s.count());
  return (
    <Pressable onPress={() => router.push("/cart")} hitSlop={10} style={styles.wrap}>
      <Text style={styles.bag}>▢</Text>
      {count > 0 ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count}</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: C.line,
  },
  bag: { fontSize: 18, color: C.ink, marginTop: -2 },
  badge: {
    position: "absolute",
    top: -3,
    right: -3,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    borderRadius: 999,
    backgroundColor: C.olive,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { color: C.bone, fontSize: 11, fontWeight: "600" },
});
