import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDUeloQDu3m91iS1dmqwBxSGYcwHysyZK0",
  authDomain: "solo-rising.firebaseapp.com",
  projectId: "solo-rising",
  storageBucket: "solo-rising.appspot.com",
  messagingSenderId: "205232148474",
  appId: "1:205232148474:web:b839619241de343ab71e43",
  measurementId: "G-K3D2C8CY55"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Auth with persistence using AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { db, app, auth };