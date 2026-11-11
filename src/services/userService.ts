import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import type { User, UserFields } from '../types';

export const ADMIN_EMAIL = 'admin@gmail.com';
const usersCollection = collection(db, 'users');

function toUser(document: { id: string; data: () => Record<string, unknown> }): User {
  const data = document.data();
  return {
    id: document.id,
    email: String(data.email ?? ''),
    matkhau: String(data.matkhau ?? ''),
    hoten: String(data.hoten ?? ''),
    hinhanh: String(data.hinhanh ?? ''),
  };
}

export async function addUser(user: UserFields) {
  return addDoc(usersCollection, {
    email: user.email.trim().toLowerCase(),
    matkhau: user.matkhau,
    hoten: user.hoten.trim(),
    hinhanh: user.hinhanh,
  });
}

export async function updateUser(id: string, user: UserFields) {
  return setDoc(doc(db, 'users', id), {
    email: user.email.trim().toLowerCase(),
    matkhau: user.matkhau,
    hoten: user.hoten.trim(),
    hinhanh: user.hinhanh,
  });
}

export async function deleteUser(id: string) {
  return deleteDoc(doc(db, 'users', id));
}

export function subscribeUsers(onUsers: (users: User[]) => void, onError: (error: Error) => void) {
  return onSnapshot(usersCollection, (snapshot) => {
    onUsers(snapshot.docs.map((document) => toUser(document)));
  }, onError);
}

export async function login(email: string, matkhau: string) {
  const snapshot = await getDocs(query(usersCollection, where('email', '==', email.trim().toLowerCase())));
  const document = snapshot.docs.find((item) => item.data().matkhau === matkhau);
  return document ? toUser(document) : null;
}

export async function emailExists(email: string, excludeId?: string) {
  const snapshot = await getDocs(query(usersCollection, where('email', '==', email.trim().toLowerCase())));
  return snapshot.docs.some((document) => document.id !== excludeId);
}