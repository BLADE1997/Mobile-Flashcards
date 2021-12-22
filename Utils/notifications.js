import AsyncStorage from "@react-native-async-storage/async-storage";
//import { Notifications, Permissions } from "expo";
import * as Notifications from "expo-notifications";
//import * as Permissions from "expo-permissions";

const NOTIFICATION_KEY = "MobileFlashcard:notifications";

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

export function createNotification() {
  return {
    title: "MobileFlashcards",
    body: "Hi! Don't forget to quiz yourself today.",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true,
    },
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Notifications.requestPermissionsAsync().then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(9);
            tomorrow.setMinutes(0);

            Notifications.scheduleNotificationAsync(
              createNotification(),
              {
                time: tomorrow,
                repeat: "day",
              },
              {
                trigger: null,
              }
            );

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}
