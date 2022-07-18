import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, push, ref, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDhW83x6Ly2G1pAeUbZXMb4wCSWXSCJGiQ',
  authDomain: 'shoppinglist-e84b8.firebaseapp.com',
  projectId: 'shoppinglist-e84b8',
  storageBucket: 'shoppinglist-e84b8.appspot.com',
  messagingSenderId: '971048186595',
  appId: '1:971048186595:web:c86bc2d850eccea42e8bd6',
  measurementId: 'G-YK5RGELESW',
  databaseUrl: 'https://shoppinglist-e84b8-default-rtdb.firebaseio.com/'
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const actionCodeSettings = {
  url: window.location.href,
  handleCodeInApp: true
  // iOS: {
  //   bundleId: 'com.example.ios'
  // },
  // android: {
  //   packageName: 'com.example.android',
  //   installApp: true,
  //   minimumVersion: '12'
  // },
  // dynamicLinkDomain: 'example.page.link'
};

export { actionCodeSettings, db };
