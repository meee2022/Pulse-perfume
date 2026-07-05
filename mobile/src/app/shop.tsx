import { ScrollView, View, Text, StyleSheet } from "react-native";
import { C, SPACING } from "../lib/theme";
import { PRODUCTS } from "../lib/products";
import ScentCard from "../components/ScentCard";

export default function Shop() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: C.bone }} contentContainerStyle={{ padding: SPACING.lg, gap: 16 }}>
      <Text style={styles.intro}>One all-over spray, three matte colorways. 100 ML each.</Text>
      {PRODUCTS.map((p) => (
        <ScentCard key={p.id} p={p} />
      ))}
      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  intro: { color: "rgba(34,36,29,0.6)", fontSize: 14, textAlign: "center", marginBottom: 4 },
});
