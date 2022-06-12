importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'AIzaSyClNYOEkRO4TLHlXKXHCwGnH4RZ3xO6WJY',
  authDomain: 'wage-app-ea813.firebaseapp.com',
  databaseURL: 'https://wage-app-ea813.firebaseio.com',
  projectId: 'wage-app-ea813',
  storageBucket: 'wage-app-ea813.appspot.com',
  messagingSenderId: '320562147194',
  appId: '1:320562147194:web:47a68406c49ab443c2f0c3',
  measurementId: 'G-DP6EKMMTD4'
});

const messaging = firebase.messaging();
//const initMessaging = firebase.messaging();

// initMessaging.onBackgroundMessage((payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   // Customize notification here
//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: 'Background Message body.',
//     icon: 'https://webapi.wagedev.com/UploadedFiles/wage_web_logo.png',
//     link: "https://wageapp.io",
//     click_action:"https://www.wageapp.io"
//   };

//   self.registration.showNotification(notificationTitle,
//     notificationOptions);
// });

// var myUrl = "";
// messaging.onBackgroundMessage(function (payload) {
//   console.log('[firebase-messaging-sw.js] Received background message', payload.data);
//   const notification = payload.notification;
//   const notificationTitle = notification.title;
//   const notificationOptions = {
//     body: notification.body,
//     icon: 'https://webapi.wagedev.com/UploadedFiles/wage_web_logo.png',
//   };
//   myUrl = "https://www.wageapp.io";
//   self.addEventListener('notificationclick', function (event) {
//     event.waitUntil(self.clients.openWindow(myUrl));
//     event.notification.close();
//   });
//   return self.registration.showNotification(notificationTitle, notificationOptions);
// });

/*
var myUrl = "";
const messaging = firebase.messaging()
messaging.setBackgroundMessageHandler(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message', payload.data);
    const notification = payload.data;
    const notificationTitle = notification.title;
    const notificationOptions = {
        body: notification.message,
        icon: notification.icon || "/images/icon.png"
    };
    myUrl = notification.url;
    self.addEventListener('notificationclick', function(event) {
        event.waitUntil(self.clients.openWindow(myUrl));
        event.notification.close();
    });
    return self.registration.showNotification(notificationTitle, notificationOptions);
});

*/
