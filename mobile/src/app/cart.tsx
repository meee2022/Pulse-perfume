import { useState } from "react";
import { ScrollView, View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { C, SPACING, RADIUS } from "../lib/theme";
import { PRODUCTS, money } from "../lib/products";
import { useCart } from "../lib/cart";
import { notifyOrderPlaced } from "../lib/notifications";
import Button from "../components/Button";

type Step = "cart" | "form" | "done";

export default function Cart() {
  const router = useRouter();
  const { lines, setQty, remove, clear } = useCart();
  const subtotal = useCart((s) => s.subtotal());
  const [step, setStep] = useState<Step>("cart");
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "" });

  const detail = (productId: string) => PRODUCTS.find((p) => p.id === productId)!;

  async function placeOrder() {
    setStep("done");
    await notifyOrderPlaced(money(subtotal));
    clear();
  }

  if (step === "done") {
    return (
      <View style={styles.center}>
        <View style={styles.check}>
          <Text style={{ color: C.bone, fontSize: 30 }}>✓</Text>
        </View>
        <Text style={styles.doneTitle}>Order Placed!</Text>
        <Text style={styles.doneBody}>
          Thank you for choosing PULSE. Your order is being prepared and will be delivered soon.
        </Text>
        <Button label="Back to Home" onPress={() => router.replace("/")} style={{ marginTop: 24 }} />
      </View>
    );
  }

  if (lines.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>Your cart is empty.</Text>
        <Button label="Browse the Range" variant="outline" onPress={() => router.replace("/shop")} style={{ marginTop: 16 }} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: C.bone }}>
      <ScrollView contentContainerStyle={{ padding: SPACING.lg, paddingBottom: 40 }}>
        {step === "cart" ? (
          lines.map((l) => {
            const p = detail(l.productId);
            return (
              <View key={l.productId} style={styles.line}>
                <View style={[styles.thumb, { backgroundColor: p.accentHex }]}>
                  <Image source={p.bottle} style={{ width: "100%", height: "130%" }} contentFit="contain" />
                </View>
                <View style={{ flex: 1, marginLeft: 14 }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={styles.name}>{p.name}</Text>
                    <Pressable onPress={() => remove(l.productId)} hitSlop={8}>
                      <Text style={styles.remove}>✕</Text>
                    </Pressable>
                  </View>
                  <Text style={styles.size}>100 ML</Text>
                  <View style={styles.lineBottom}>
                    <View style={styles.stepper}>
                      <Pressable onPress={() => setQty(l.productId, l.qty - 1)} hitSlop={8}>
                        <Text style={styles.stepBtn}>−</Text>
                      </Pressable>
                      <Text style={styles.qty}>{l.qty}</Text>
                      <Pressable onPress={() => setQty(l.productId, l.qty + 1)} hitSlop={8}>
                        <Text style={styles.stepBtn}>+</Text>
                      </Pressable>
                    </View>
                    <Text style={styles.linePrice}>{money(p.price * l.qty)}</Text>
                  </View>
                </View>
              </View>
            );
          })
        ) : (
          <View style={{ gap: 14 }}>
            <Text style={styles.formTitle}>Delivery Details</Text>
            <Field label="Full Name" value={form.name} onChangeText={(v) => setForm({ ...form, name: v })} />
            <Field label="Phone" value={form.phone} onChangeText={(v) => setForm({ ...form, phone: v })} keyboardType="phone-pad" />
            <Field label="Delivery Address" value={form.address} onChangeText={(v) => setForm({ ...form, address: v })} />
            <Field label="City" value={form.city} onChangeText={(v) => setForm({ ...form, city: v })} />
          </View>
        )}
      </ScrollView>

      <View style={styles.bar}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
          <Text style={styles.subLabel}>Subtotal</Text>
          <Text style={styles.subValue}>{money(subtotal)}</Text>
        </View>
        {step === "cart" ? (
          <Button label="Checkout" onPress={() => setStep("form")} />
        ) : (
          <Button label={`Place Order · ${money(subtotal)}`} variant="olive" onPress={placeOrder} />
        )}
      </View>
    </View>
  );
}

function Field({
  label,
  ...props
}: { label: string } & React.ComponentProps<typeof TextInput>) {
  return (
    <View>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput style={styles.input} placeholderTextColor={C.muted} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: C.bone, padding: SPACING.xl },
  empty: { color: "rgba(34,36,29,0.5)", fontSize: 15 },

  line: { flexDirection: "row", backgroundColor: C.white, borderRadius: RADIUS.md, padding: 12, borderWidth: 1, borderColor: C.line, marginBottom: 12 },
  thumb: { width: 74, height: 92, borderRadius: RADIUS.sm, overflow: "hidden", alignItems: "center" },
  name: { fontSize: 14, fontWeight: "600", letterSpacing: 0.6, color: C.ink, textTransform: "uppercase" },
  remove: { color: C.muted, fontSize: 16 },
  size: { fontSize: 12, color: C.muted, marginTop: 2 },
  lineBottom: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 14 },
  stepper: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: C.line, borderRadius: RADIUS.pill, paddingHorizontal: 8, gap: 14 },
  stepBtn: { fontSize: 18, color: C.ink, width: 18, textAlign: "center" },
  qty: { fontSize: 14, color: C.ink, minWidth: 16, textAlign: "center" },
  linePrice: { fontSize: 14, fontWeight: "600", color: C.ink },

  formTitle: { fontSize: 16, fontWeight: "600", letterSpacing: 1, textTransform: "uppercase", color: C.ink, marginBottom: 4 },
  fieldLabel: { fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: C.muted, marginBottom: 6 },
  input: { backgroundColor: C.white, borderWidth: 1, borderColor: C.line, borderRadius: RADIUS.sm, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, color: C.ink },

  bar: { padding: SPACING.md, paddingBottom: 28, borderTopWidth: 1, borderTopColor: C.line, backgroundColor: C.bone },
  subLabel: { fontSize: 14, color: "rgba(34,36,29,0.6)" },
  subValue: { fontSize: 18, fontWeight: "700", color: C.ink },

  check: { width: 64, height: 64, borderRadius: 999, backgroundColor: C.olive, alignItems: "center", justifyContent: "center" },
  doneTitle: { fontSize: 24, fontWeight: "700", letterSpacing: 1, textTransform: "uppercase", color: C.ink, marginTop: 20 },
  doneBody: { fontSize: 14, lineHeight: 22, color: "rgba(34,36,29,0.65)", textAlign: "center", marginTop: 12 },
});
