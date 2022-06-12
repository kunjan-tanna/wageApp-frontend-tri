import Firebase from 'firebase/app';

import 'firebase/firestore';
import '@firebase/messaging';
import axios from 'axios';

var Config = {
  apiKey: 'AIzaSyClNYOEkRO4TLHlXKXHCwGnH4RZ3xO6WJY',
  authDomain: 'wage-app-ea813.firebaseapp.com',
  databaseURL: 'https://wage-app-ea813.firebaseio.com',
  projectId: 'wage-app-ea813',
  storageBucket: 'wage-app-ea813.appspot.com',
  messagingSenderId: '320562147194',
  appId: '1:320562147194:web:47a68406c49ab443c2f0c3',
  measurementId: 'G-DP6EKMMTD4'
  // apiKey: 'AIzaSyAFT9TK4zuK8lYOH1BfwP2OLVIPMOzEWQo',
  // authDomain: 'fir-demoios-ac5e5.firebaseapp.com',
  // databaseURL: 'https://fir-demoios-ac5e5.firebaseio.com',
  // projectId: 'fir-demoios-ac5e5',
  // storageBucket: 'fir-demoios-ac5e5.appspot.com',
  // messagingSenderId: '78177157037',
  // appId: '1:78177157037:web:d038a351fae7576cd56b24',
  // measurementId: 'G-0LJ2Q16ETE'
};

Firebase.initializeApp(Config);

const db = Firebase.firestore();
// const messaging = Firebase.messaging();
const messagesRef = db.collection('Conversations');
var firebaseDate = Firebase.firestore.FieldValue.serverTimestamp();
const FS = Firebase.firestore;

const sendNotification = (currentUser, receiverUser, conversationId) => {
  db.collection('Users')
    .doc(String(receiverUser.converser.id))
    .get()
    .then(snap => {
      let count = snap.data()?.unreadConversation;
      let adminCount = snap.data()?.unreadAdminNotifications || 0;
      var payload = {
        priority: 'HIGH',
        data: {
          conversationId: conversationId,
          notificationType: 'ChatMessage',
          type: 6
        },
        notification: {
          title: 'You have a new message',
          body: `You have a new message from ${currentUser.firstName} ${currentUser.lastName} about ${receiverUser.offer.title}.`,
          badge: count + adminCount
        },
        registration_ids: []
      };

      let registration_ids = [];
      db.collection('Users')
        .doc(String(receiverUser.converser.id))
        .collection('token')
        .get()
        .then(snap => {
          snap.forEach(s => {
            registration_ids.push(s.id);
          });

          payload.registration_ids = registration_ids;

          var sendConfig = {
            method: 'post',
            url: 'https://fcm.googleapis.com/fcm/send',
            headers: {
              'Content-Type': 'application/json',
              Authorization:
                'key=AAAASqL-L3o:APA91bGU5UA0eQzRJhO0JtOGrzYEAKvopMN7Mc1CBThVRu_pFyDT7b6m914fYuk9n8H1ebZCpubqC4H77NR6Ns1AlEyAPvCsBt4dBpcNKSx-q4EDHSbXLZQPGtFbrzq4QWgA3eZZfyJM'
            },
            data: JSON.stringify(payload)
          };

          axios(sendConfig)
            .then(function(response) {
              console.log(JSON.stringify(response.data));
            })
            .catch(function(error) {
              console.log(error);
            });
        });
    });
};

export { db, Firebase, messagesRef, firebaseDate, sendNotification, FS };

/*

<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/8.3.2/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyClNYOEkRO4TLHlXKXHCwGnH4RZ3xO6WJY",
    authDomain: "wage-app-ea813.firebaseapp.com",
    databaseURL: "https://wage-app-ea813.firebaseio.com",
    projectId: "wage-app-ea813",
    storageBucket: "wage-app-ea813.appspot.com",
    messagingSenderId: "320562147194",
    appId: "1:320562147194:web:47a68406c49ab443c2f0c3",
    measurementId: "G-DP6EKMMTD4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
</script>


*/
