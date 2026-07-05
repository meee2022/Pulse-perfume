import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Ask for permission (call once on app start or before first notification).
export async function ensureNotificationPermission(): Promise<boolean> {
  if (!Device.isDevice) return false;
  const { status } = await Notifications.getPermissionsAsync();
  let final = status;
  if (status !== "granted") {
    final = (await Notifications.requestPermissionsAsync()).status;
  }
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "PULSE",
      importance: Notifications.AndroidImportance.DEFAULT,
      lightColor: "#7E836E",
    });
  }
  return final === "granted";
}

// Local notification confirming the order (demo of push-style engagement).
export async function notifyOrderPlaced(total: string) {
  const ok = await ensureNotificationPermission();
  if (!ok) return;
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Order placed — thank you 🖤",
      body: `Your PULSE order (${total}) is being prepared and will be delivered soon.`,
    },
    trigger: { seconds: 2, type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL },
  });
}
