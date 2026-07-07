import { useState } from "react";
import { ScrollView, View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { C, SPACING, RADIUS } from "../../lib/theme";
import { productById, money, SIZES, type SizeId } from "../../lib/products";
import { useCart } from "../../lib/cart";
import Button from "../../components/Button";

const { width } = Dimensions.get("window");

function NoteRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.noteRow}>
      <Text style={styles.noteLabel}>{label}</Text>
      <Text style={styles.noteValue}>{value}</Text>
    </View>
  );
}

export default function ProductDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const add = useCart((s) => s.add);
  const [size, setSize] = useState<SizeId>("100ml");
  const p = productById(String(id));

  const isTester = size === "3ml";
  const price = p ? Math.round(p.price * (SIZES.find((s) => s.id === size)?.multiplier ?? 1)) : 0;

  if (!p) {
    return (
      <View style={styles.center}>
        <Text style={{ color: C.ink }}>Product not found.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: C.bone }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={[styles.hero, { backgroundColor: isTester ? "#14130f" : p.accentHex }]}>
          <Image source={isTester ? p.tester : p.card} style={styles.heroImg} contentFit="cover" contentPosition="center" transition={250} />
          {isTester ? (
            <View style={styles.testerTag}>
              <Text style={styles.testerTagText}>3 ML · Tester</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.body}>
          <Text style={styles.name}>{p.name}</Text>
          <Text style={styles.meaning}>{p.meaning}</Text>
          <Text style={styles.blurb}>{p.blurb}</Text>

          {/* size selector */}
          <View style={styles.sizes}>
            {SIZES.map((s) => {
              const active = s.id === size;
              return (
                <Pressable key={s.id} onPress={() => setSize(s.id)} style={[styles.sizePill, active && styles.sizePillOn]}>
                  <Text style={[styles.sizeText, active && styles.sizeTextOn]}>{s.id === "100ml" ? "100 ML" : "3 ML"}</Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.notes}>
            <NoteRow label="Top" value={p.notes.top} />
            <NoteRow label="Heart" value={p.notes.heart} />
            <NoteRow label="Base" value={p.notes.base} />
          </View>

          <View style={styles.meta}>
            <Text style={styles.metaText}>
              {isTester ? "Discovery Tester · 3 ML · Fine Mist" : "All-Over Spray · 100 ML · Fine Mist"}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* sticky add-to-cart bar */}
      <View style={styles.bar}>
        <Text style={styles.price}>{money(price)}</Text>
        <Button
          label="Add to Cart"
          style={{ flex: 1, marginLeft: 14 }}
          onPress={() => {
            add(p.id, size);
            router.push("/cart");
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: C.bone },
  hero: { height: width * 1.15, overflow: "hidden" },
  heroImg: { width: "100%", height: "100%" },
  testerTag: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgba(245,244,239,0.14)",
    borderRadius: RADIUS.pill,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  testerTagText: { color: C.bone, fontSize: 10, letterSpacing: 1.4, fontWeight: "600", textTransform: "uppercase" },
  body: { padding: SPACING.lg },
  sizes: { flexDirection: "row", gap: 10, marginTop: 20 },
  sizePill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    borderColor: C.line,
    backgroundColor: C.white,
  },
  sizePillOn: { backgroundColor: C.ink, borderColor: C.ink },
  sizeText: { fontSize: 12, letterSpacing: 1, fontWeight: "600", color: C.olive, textTransform: "uppercase" },
  sizeTextOn: { color: C.bone },
  name: { fontSize: 26, fontWeight: "700", letterSpacing: 1, color: C.ink, textTransform: "uppercase" },
  meaning: { fontSize: 14, fontStyle: "italic", color: C.olive, marginTop: 4 },
  blurb: { fontSize: 15, lineHeight: 23, color: "rgba(34,36,29,0.7)", marginTop: 16 },
  notes: { marginTop: 22, borderTopWidth: 1, borderTopColor: C.line, paddingTop: 18, gap: 12 },
  noteRow: { flexDirection: "row" },
  noteLabel: { width: 60, fontSize: 12, letterSpacing: 1, textTransform: "uppercase", color: "rgba(34,36,29,0.4)" },
  noteValue: { flex: 1, fontSize: 14, color: C.ink },
  meta: { marginTop: 22, backgroundColor: C.white, borderRadius: RADIUS.md, padding: 14, borderWidth: 1, borderColor: C.line },
  metaText: { fontSize: 12, letterSpacing: 0.8, color: C.muted, textAlign: "center", textTransform: "uppercase" },
  bar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.md,
    paddingBottom: 28,
    backgroundColor: C.bone,
    borderTopWidth: 1,
    borderTopColor: C.line,
  },
  price: { fontSize: 20, fontWeight: "700", letterSpacing: 0.5, color: C.ink },
});
