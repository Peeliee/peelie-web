import { Stack } from "expo-router";

import { useFcmPush } from "@/hooks/use-fcm-push";

export default function RootLayout() {
  useFcmPush();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "none",
      }}
    />
  );
}
