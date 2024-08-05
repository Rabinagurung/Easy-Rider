# INFO-6132--01--lab-04

<p align="center">
  <img src="https://firebasestorage.googleapis.com/v0/b/r-n-lab-2.appspot.com/o/screens%2FSimulator%20Screenshot%20-%20iPhone%2015%20Pro%20-%202024-08-04%20at%2023.53.55.png?alt=media&token=316bb279-b4fb-424b-94dd-d7f8d17db580" alt="Empty Screen" width="200" style="margin-right: 10px;" />
  <img src="https://firebasestorage.googleapis.com/v0/b/r-n-lab-2.appspot.com/o/screens%2FSimulator%20Screenshot%20-%20iPhone%2015%20Pro%20-%202024-08-04%20at%2023.54.07.png?alt=media&token=7bed1a31-51e4-492c-90ee-06db52a6baaa" alt="Item list" width="200" style="margin-right: 10px;" />
  <img src="https://firebasestorage.googleapis.com/v0/b/r-n-lab-2.appspot.com/o/screens%2FSimulator%20Screenshot%20-%20iPhone%2015%20Pro%20-%202024-08-04%20at%2023.54.14.png?alt=media&token=e4dba433-9909-4982-9efe-e8d581c24572" alt="with complete" width="200" style="margin-right: 10px;" />
</p>


<p align="center">
  <img src="https://firebasestorage.googleapis.com/v0/b/r-n-lab-2.appspot.com/o/screens%2FSimulator%20Screenshot%20-%20iPhone%2015%20Pro%20-%202024-08-04%20at%2023.54.44.png?alt=media&token=368b8e69-d3f9-4871-a961-cebff1f8f4f6" alt="Empty Screen" width="200" style="margin-right: 10px;" />
  <img src="https://firebasestorage.googleapis.com/v0/b/r-n-lab-2.appspot.com/o/screens%2FSimulator%20Screenshot%20-%20iPhone%2015%20Pro%20-%202024-08-04%20at%2023.54.50.png?alt=media&token=04ff0ade-00f0-46ed-891c-71e13ba1ceba" alt="Item list" width="200" style="margin-right: 10px;" />
  <img src="https://firebasestorage.googleapis.com/v0/b/r-n-lab-2.appspot.com/o/screens%2FSimulator%20Screenshot%20-%20iPhone%2015%20Pro%20-%202024-08-04%20at%2023.54.56.png?alt=media&token=4a2b27cf-d270-4bac-880c-6215aca8ba48" alt="with complete" width="200" style="margin-right: 10px;" />
</p>


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
