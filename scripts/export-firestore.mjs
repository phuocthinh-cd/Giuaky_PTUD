import fs from 'node:fs/promises';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDgS1dVrlebaAQn1wEDUCRnRPklkV59Ny4',
  authDomain: 'giuaky-ptud.firebaseapp.com',
  projectId: 'giuaky-ptud',
  storageBucket: 'giuaky-ptud.firebasestorage.app',
  messagingSenderId: '577742780701',
  appId: '1:577742780701:web:bd40e0a8983d68c47449f4',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const snapshot = await getDocs(collection(db, 'users'));
const users = snapshot.docs.map((document) => ({
  id: document.id,
  ...document.data(),
}));

await fs.writeFile('./users-export.json', `${JSON.stringify(users, null, 2)}\n`);
console.log(`Da xuat ${users.length} nguoi dung vao users-export.json`);
