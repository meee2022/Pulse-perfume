import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect } from "react";
import { C } from "../lib/theme";
import CartButton from "../components/CartButton";
import Logo from "../components/Logo";
import { ensureNotificationPermission } from "../lib/notifications";

export default function RootLayout() {
  useEffect(() => {
    ensureNotificationPermission();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: C.bone }}>
      <StatusBar style="dark" />
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
    </GestureHandlerRootView>
  );
}
