# INFO-6132--01--lab-04

**Setup Firebase:**
 - Create a Firebase project in the Firebase console.
 - Obtain your Firebase configuration details.
 - Update a firebaseConfig.ts file in the src/config directory and add your configuration:
    ```Typescript
      // Import the functions you need from the SDKs you need
    import { initializeApp } from 'firebase/app';
    import { getFirestore } from 'firebase/firestore';
    import { fbConfig } from './config';

    const firebaseConfig = {
      apiKey: 'YOUR_API_KEY',
      authDomain: 'YOUR_AUTH_DOMAIN',
      projectId: 'YOUR_PROJECT_ID',
      storageBucket: 'YOUR_STORAGE_BUCKET',
      messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
      appId: 'YOUR_APP_ID',
    };
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    export const db = getFirestore(app);
  
    ```
