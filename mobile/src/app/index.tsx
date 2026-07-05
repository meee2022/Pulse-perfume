import { ScrollView, View, Text, StyleSheet, Dimensions } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { C, SPACING, RADIUS } from "../lib/theme";
import { PRODUCTS, BENEFITS, CONTENT, HERO_IMG, BOXES_IMG } from "../lib/products";
import Button from "../components/Button";
import ScentCard from "../components/ScentCard";
import Logo from "../components/Logo";

const { width, height } = Dimensions.get("window");

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <View style={styles.head}>
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text style={styles.h2}>{title}</Text>
      {sub ? <Text style={styles.p}>{sub}</Text> : null}
    </View>
  );
}

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: C.bone }} showsVerticalScrollIndicator={false}>
      {/* HERO */}
      <View style={[styles.hero, { height: Math.min(height * 0.82, 680) }]}>
        <Image source={HERO_IMG} style={StyleSheet.absoluteFill} contentFit="cover" contentPosition="center" />
        <LinearGradient
          colors={["rgba(245,244,239,0.65)", "rgba(245,244,239,0.05)", C.bone]}
          locations={[0, 0.45, 1]}
          style={StyleSheet.absoluteFill}
        />
        <View style={[styles.heroInner, { paddingTop: insets.top + 64 }]}>
          <Text style={styles.heroEyebrow}>{CONTENT.est}</Text>
          <Text style={styles.heroTitle}>MOVE{"\n"}WITH IT.</Text>
          <Text style={styles.heroSub}>{CONTENT.heroSub}</Text>
          <Text style={styles.heroProduct}>ALL-OVER SPRAY · 100 ML</Text>
          <Button label="Discover the Range" onPress={() => router.push("/shop")} style={styles.heroBtn} />
        </View>
      </View>

      {/* BENEFITS */}
      <View style={styles.benefits}>
        {BENEFITS.map((b, i) => (
          <View key={b} style={styles.benefitRow}>
            <View style={styles.dot} />
            <Text style={styles.benefitText}>{b}</Text>
          </View>
        ))}
      </View>

      {/* FEATURED */}
      <SectionHead eyebrow="The Range" title="Three Scents" sub="One all-over spray, three moods. Pick your pulse." />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={width * 0.72 + 16}
        contentContainerStyle={{ paddingHorizontal: SPACING.lg, gap: 16, paddingVertical: 4 }}
      >
        {PRODUCTS.map((p) => (
          <ScentCard key={p.id} p={p} width={width * 0.72} />
        ))}
      </ScrollView>

      {/* PROMISE band */}
      <View style={styles.promise}>
        <Text style={styles.promiseEyebrow}>The Promise</Text>
        <Text style={styles.promiseTitle}>Fresh that lasts.</Text>
        <Text style={styles.promiseBody}>
          Not a cover-up. PULSE resets the air around you and your clothes with a weightless, even mist — then keeps
          moving with you all day.
        </Text>
        <View style={styles.tagRow}>
          {["Fresh that lasts.", "Feel the pulse."].map((t) => (
            <View key={t} style={styles.tag}>
              <Text style={styles.tagText}>{t}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* PACKAGING */}
      <SectionHead eyebrow="Packaging" title={CONTENT.packagingTitle} sub={CONTENT.packagingBody} />
      <View style={{ paddingHorizontal: SPACING.lg }}>
        <Image source={BOXES_IMG} style={styles.packImg} contentFit="cover" />
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Logo tone="bone" height={26} />
        <Text style={styles.footerText}>{CONTENT.est}</Text>
        <Button label="Shop the Collection" variant="olive" onPress={() => router.push("/shop")} style={{ marginTop: 20 }} />
        <Text style={styles.copy}>© 2026 Pulse Perfume · Feel the pulse.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: { justifyContent: "flex-end" },
  heroInner: { padding: SPACING.lg, alignItems: "center", paddingBottom: SPACING.xl },
  heroEyebrow: { color: C.olive, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 },
  heroTitle: { color: C.ink, fontSize: 46, fontWeight: "700", letterSpacing: 3, textAlign: "center", lineHeight: 48 },
  heroSub: { color: "rgba(34,36,29,0.7)", fontSize: 15, marginTop: 14, textAlign: "center" },
  heroProduct: { color: C.olive, fontSize: 11, letterSpacing: 1.6, textTransform: "uppercase", marginTop: 6 },
  heroBtn: { marginTop: 24, alignSelf: "stretch", marginHorizontal: 24 },

  benefits: { paddingHorizontal: SPACING.lg, paddingVertical: SPACING.xl, gap: 12, borderBottomWidth: 1, borderColor: C.line },
  benefitRow: { flexDirection: "row", alignItems: "center", gap: 12, justifyContent: "center" },
  dot: { width: 5, height: 5, borderRadius: 3, backgroundColor: C.olive },
  benefitText: { color: C.ink, fontSize: 12, letterSpacing: 1.4, textTransform: "uppercase" },

  head: { paddingHorizontal: SPACING.lg, marginTop: SPACING.xl, marginBottom: SPACING.md, alignItems: "center" },
  eyebrow: { color: C.olive, fontSize: 11, letterSpacing: 2, textTransform: "uppercase" },
  h2: { color: C.ink, fontSize: 28, fontWeight: "700", letterSpacing: 1.5, textTransform: "uppercase", marginTop: 8, textAlign: "center" },
  p: { color: "rgba(34,36,29,0.6)", fontSize: 14, textAlign: "center", marginTop: 8, lineHeight: 21, maxWidth: 340 },

  promise: { backgroundColor: C.olive, marginTop: SPACING.xl, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.xl },
  promiseEyebrow: { color: "rgba(245,244,239,0.6)", fontSize: 11, letterSpacing: 2, textTransform: "uppercase" },
  promiseTitle: { color: C.bone, fontSize: 30, fontWeight: "700", letterSpacing: 1, textTransform: "uppercase", marginTop: 10 },
  promiseBody: { color: "rgba(245,244,239,0.8)", fontSize: 14, lineHeight: 22, marginTop: 12 },
  tagRow: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 18 },
  tag: { borderWidth: 1, borderColor: "rgba(245,244,239,0.3)", borderRadius: RADIUS.pill, paddingHorizontal: 14, paddingVertical: 7 },
  tagText: { color: "rgba(245,244,239,0.85)", fontSize: 11, letterSpacing: 1, textTransform: "uppercase" },

  packImg: { width: "100%", height: 230, borderRadius: RADIUS.lg },

  footer: { backgroundColor: C.charcoal, marginTop: SPACING.xl, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.xl + 8, alignItems: "center" },
  footerText: { color: "rgba(245,244,239,0.6)", fontSize: 12, marginTop: 16 },
  copy: { color: "rgba(245,244,239,0.4)", fontSize: 11, marginTop: 24 },
});
