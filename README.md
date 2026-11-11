# Quan ly nguoi dung - React Native Expo

Ung dung dung Expo, TypeScript va Cloud Firestore. Web la phan admin chinh; Android/iOS la phan xem va cap nhat anh ca nhan.

## 1. Cai dat

```bash
npx create-expo-app@latest PTUD-Cuoiky --template blank-typescript
cd PTUD-Cuoiky
npm i firebase
npx expo install expo-image-picker expo-image-manipulator expo-font react-dom react-native-web
npx expo start --web
npx expo start
```

Neu project da ton tai, chi can chay lenh `npm i` va cac lenh `npx expo install` o tren.

## 2. Cau hinh Firebase

1. Vao Firebase Console, tao project va tao Web App.
2. Vao **Build > Firestore Database > Create database**.
3. Chon **Test mode** trong luc phat trien.
4. Copy Firebase Web config vao `src/firebase.ts`.
5. Tao collection ten `users`.
6. Tao document admin voi ID tuy chon va dung chinh xac 4 field:

```text
email: admin@gmail.com
matkhau: matkhau-cua-ban
hoten: Quan tri vien
hinhanh: ""
```

`ADMIN_EMAIL` duoc khai bao trong `src/services/userService.ts`. App khong dung `role`, `createdAt`, `name` hay `id` trong data Firestore. ID van la document ID.

Luu y: `matkhau` dang duoc luu plaintext de phuc vu dung yeu cau bai giua ky. Khong dung cach nay cho san pham that.

## 3. Chay app

```bash
npx expo start --web
npx expo start
```

Web mo tai dia chi Expo in ra. Mobile can Expo Go va cung Wi-Fi voi may tinh.

## 4. Chuc nang

- Web: dang nhap admin, danh sach realtime, tim kiem, them, sua, xoa.
- Mobile: dang nhap user, xem email/ho ten/anh, chon anh va cap nhat.
- Anh duoc resize toi da 400px, JPEG quality 0.3 va luu base64 data URL trong `hinhanh`.
- Khong dung Firebase Storage.

## 5. Export Firestore ra JSON

Tai service account key tai Firebase Console: **Project settings > Service accounts > Generate new private key**. Luu file voi ten `serviceAccountKey.json` o thu muc goc va khong commit file nay.

```bash
npm i -D firebase-admin
node scripts/export-firestore.mjs
```

Ket qua la `users-export.json`. File nay co them `id` o cap export de biet document ID; trong Firestore document data van chi co 4 field yeu cau.

## 6. Kiem tra truoc khi nop

```bash
npx tsc --noEmit
npx expo-doctor
```

Nen chup anh: man hinh login, admin list, form them, form sua, hop thoai xoa, realtime update, profile mobile va cap nhat anh.
