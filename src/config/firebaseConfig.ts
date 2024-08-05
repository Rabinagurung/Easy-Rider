// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { fbConfig } from './config';

const firebaseConfig = {
  apiKey: fbConfig.apiKey,
  authDomain: fbConfig.authDomain,
  projectId: fbConfig.projectId,
  storageBucket: fbConfig.storageBucket,
  messagingSenderId: fbConfig.messagingSenderId,
  appId: fbConfig.appId
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
