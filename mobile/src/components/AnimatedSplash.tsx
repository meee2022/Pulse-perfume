import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View, Dimensions, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { C } from "../lib/theme";

const BONE = require("../../assets/images/pulse/logo-bone.png");
const RATIO = 1290 / 360; // logo aspect
const { width } = Dimensions.get("window");
const LOGO_W = Math.min(width * 0.62, 280);

/**
 * Cinematic launch animation for PULSE.
 * The wordmark fades in, then beats twice like a heartbeat (the brand IS a pulse),
 * radar rings ripple out on the beat, then the whole veil fades to reveal the app.
 * Uses the built-in Animated API (native driver) — no reanimated version risk.
 */
export default function AnimatedSplash({ onDone }: { onDone: () => void }) {
  const veil = useRef(new Animated.Value(1)).current; // whole overlay
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.9)).current;
  const capOpacity = useRef(new Animated.Value(0)).current;
  const ring1 = useRef(new Animated.Value(0)).current; // 0 → 1 drives scale+fade
  const ring2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const ringPulse = (v: Animated.Value, delay: number) =>
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(v, { toValue: 1, duration: 1100, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]);

    const heartbeat = Animated.sequence([
      Animated.timing(logoScale, { toValue: 1.1, duration: 130, easing: Easing.out(Easing.quad), useNativeDriver: true }),
      Animated.timing(logoScale, { toValue: 1.0, duration: 150, easing: Easing.in(Easing.quad), useNativeDriver: true }),
      Animated.timing(logoScale, { toValue: 1.055, duration: 110, easing: Easing.out(Easing.quad), useNativeDriver: true }),
      Animated.timing(logoScale, { toValue: 1.0, duration: 220, easing: Easing.in(Easing.quad), useNativeDriver: true }),
    ]);

    Animated.sequence([
      // 1 — entrance
      Animated.parallel([
        Animated.timing(logoOpacity, { toValue: 1, duration: 560, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
        Animated.timing(logoScale, { toValue: 1, duration: 640, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]),
      // 2 — heartbeat + radar rings + caption fade-in
      Animated.parallel([
        heartbeat,
        ringPulse(ring1, 0),
        ringPulse(ring2, 220),
        Animated.timing(capOpacity, { toValue: 1, duration: 700, delay: 260, useNativeDriver: true }),
      ]),
      // 3 — hold
      Animated.delay(360),
      // 4 — reveal the app
      Animated.timing(veil, { toValue: 0, duration: 520, easing: Easing.in(Easing.cubic), useNativeDriver: true }),
    ]).start(({ finished }) => finished && onDone());
  }, []);

  const ringStyle = (v: Animated.Value) => ({
    opacity: v.interpolate({ inputRange: [0, 0.15, 1], outputRange: [0, 0.5, 0] }),
    transform: [{ scale: v.interpolate({ inputRange: [0, 1], outputRange: [0.5, 2.6] }) }],
  });

  return (
    <Animated.View style={[StyleSheet.absoluteFill, styles.root, { opacity: veil }]} pointerEvents="none">
      <LinearGradient colors={["#1d1e18", "#141410", "#0d0d0a"]} style={StyleSheet.absoluteFill} />

      <View style={styles.center}>
        {/* radar rings ripple out on the beat */}
        <Animated.View style={[styles.ring, ringStyle(ring1)]} />
        <Animated.View style={[styles.ring, ringStyle(ring2)]} />

        <Animated.Image
          source={BONE}
          style={{ width: LOGO_W, height: LOGO_W / RATIO, opacity: logoOpacity, transform: [{ scale: logoScale }] }}
          resizeMode="contain"
        />
        <Animated.Text style={[styles.caption, { opacity: capOpacity }]}>MODERN SPORT SCENT</Animated.Text>
      </View>
    </Animated.View>
  );
}

const RING = LOGO_W * 1.15;

const styles = StyleSheet.create({
  root: { alignItems: "center", justifyContent: "center", zIndex: 100 },
  center: { alignItems: "center", justifyContent: "center" },
  ring: {
    position: "absolute",
    width: RING,
    height: RING,
    borderRadius: RING / 2,
    borderWidth: 1,
    borderColor: "rgba(245,244,239,0.35)",
  },
  caption: {
    marginTop: 22,
    color: "rgba(245,244,239,0.62)",
    fontSize: 11,
    letterSpacing: 6,
    fontWeight: "500",
  },
});
