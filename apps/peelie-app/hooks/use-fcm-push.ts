import { useEffect } from "react";

import messaging, {
  type FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";

export function useFcmPush() {
  useEffect(() => {
    const unsubOnMessage = messaging().onMessage(handleForeground);
    const unsubOnOpened = messaging().onNotificationOpenedApp(handleOpened);

    messaging()
      .getInitialNotification()
      .then((initial) => {
        if (initial) handleOpened(initial);
      })
      .catch((error) => {
        console.log("[FCM] getInitialNotification failed:", error);
      });

    return () => {
      unsubOnMessage();
      unsubOnOpened();
    };
  }, []);
}

const handleForeground = (message: FirebaseMessagingTypes.RemoteMessage) => {
  console.log("[FCM] foreground message:", message);
};

const handleOpened = (message: FirebaseMessagingTypes.RemoteMessage) => {
  console.log("[FCM] notification opened:", message);
};
