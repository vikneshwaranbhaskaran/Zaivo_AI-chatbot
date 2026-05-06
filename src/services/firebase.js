// src/services/firebase.js
// Firebase app + Firestore initialisation
// All config values come from VITE_ env variables so they are never hard-coded.

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};

// Debug: Show what config was loaded
console.log('🔧 Firebase Config:', {
  projectId: firebaseConfig.projectId,
  appId: firebaseConfig.appId ? 'loaded' : 'MISSING',
  apiKey: firebaseConfig.apiKey ? 'loaded' : 'MISSING',
});

const app = initializeApp(firebaseConfig);

/** Firestore database instance – import this wherever you need Firestore. */
export const db = getFirestore(app);

export default app;
