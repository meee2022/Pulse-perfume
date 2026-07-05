import { View, Text, Pressable, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { C, RADIUS } from "../lib/theme";
import { money, type Product } from "../lib/products";

export default function ScentCard({ p, width }: { p: Product; width?: number }) {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.push(`/product/${p.id}`)}
      style={({ pressed }) => [styles.card, width ? { width } : { flex: 1 }, pressed && { opacity: 0.92 }]}
    >
      <View style={[styles.imgWrap, { backgroundColor: p.accentHex }]}>
        <Image source={p.bottle} style={styles.img} contentFit="cover" contentPosition="center" />
        <View style={styles.tag}>
          <Text style={styles.tagText}>100 ML</Text>
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.name}>{p.name}</Text>
        <Text style={styles.meaning}>{p.meaning}</Text>
        <View style={styles.row}>
          <Text style={styles.price}>{money(p.price)}</Text>
          <Text style={styles.link}>View →</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: C.white,
    borderRadius: RADIUS.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: C.line,
  },
  imgWrap: { height: 265, overflow: "hidden" },
  img: { width: "100%", height: "100%" },
  tag: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "rgba(0,0,0,0.25)",
    borderRadius: RADIUS.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagText: { color: C.white, fontSize: 10, letterSpacing: 1.2, fontWeight: "600" },
  body: { padding: 16 },
  name: { fontSize: 16, fontWeight: "600", letterSpacing: 0.8, color: C.ink, textTransform: "uppercase" },
  meaning: { fontSize: 12, fontStyle: "italic", color: C.olive, marginTop: 2 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 14 },
  price: { fontSize: 15, fontWeight: "600", letterSpacing: 0.6, color: C.ink },
  link: { fontSize: 12, color: C.muted, letterSpacing: 0.5 },
});
