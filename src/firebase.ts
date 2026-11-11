import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Thay cac gia tri nay bang Firebase Web App config cua ban neu dung project khac.
  apiKey: 'AIzaSyDgS1dVrlebaAQn1wEDUCRnRPklkV59Ny4',
  authDomain: 'giuaky-ptud.firebaseapp.com',
  projectId: 'giuaky-ptud',
  storageBucket: 'giuaky-ptud.firebasestorage.app',
  messagingSenderId: '577742780701',
  appId: '1:577742780701:web:bd40e0a8983d68c47449f4',
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);