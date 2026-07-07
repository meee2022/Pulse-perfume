import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { C } from "../lib/theme";
import CartButton from "../components/CartButton";
import Logo from "../components/Logo";
import AnimatedSplash from "../components/AnimatedSplash";
import { ensureNotificationPermission } from "../lib/notifications";

// keep the native splash up until our animated one takes over (no white flash)
SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    ensureNotificationPermission();
    // hand off from the native splash to our animated overlay (both dark → seamless)
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: C.bone }}>
      <StatusBar style={splashDone ? "dark" : "light"} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: C.bone },
          headerShadowVisible: false,
          headerTintColor: C.ink,
          headerTitle: () => <Logo height={18} />,
          headerRight: () => <CartButton />,
          contentStyle: { backgroundColor: C.bone },
        }}
      >
        <Stack.Screen name="index" options={{ headerTransparent: true, headerTitle: () => null }} />
        <Stack.Screen name="shop" options={{ title: "The Range" }} />
        <Stack.Screen name="product/[id]" options={{ title: "", headerBackTitle: "Back" }} />
        <Stack.Screen name="cart" options={{ title: "Your Cart" }} />
      </Stack>

      {!splashDone && <AnimatedSplash onDone={() => setSplashDone(true)} />}
    </GestureHandlerRootView>
  );
}
