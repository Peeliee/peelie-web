import { useEffect } from "react";

import messaging, {
  type FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";

export function useFcmPush() {
  useEffect(() => {
    let unsubscribeOnMessage: (() => void) | undefined;
    let unsubscribeOnOpened: (() => void) | undefined;

    const setup = async () => {
      const authStatus = await messaging().requestPermission();
      const granted =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (!granted) {
        console.log("[FCM] permission denied:", authStatus);
        return;
      }

      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      console.log("[FCM] token:", token);

      unsubscribeOnMessage = messaging().onMessage(handleForeground);
      unsubscribeOnOpened = messaging().onNotificationOpenedApp(handleOpened);

      const initial = await messaging().getInitialNotification();
      if (initial) handleOpened(initial);
    };

    setup().catch((error) => {
      console.log("[FCM] setup failed:", error);
    });

    return () => {
      unsubscribeOnMessage?.();
      unsubscribeOnOpened?.();
    };
  }, []);
}

const handleForeground = (message: FirebaseMessagingTypes.RemoteMessage) => {
  console.log("[FCM] foreground message:", message);
};

const handleOpened = (message: FirebaseMessagingTypes.RemoteMessage) => {
  console.log("[FCM] notification opened:", message);
};
