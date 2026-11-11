import { useEffect, useState } from 'react';
import { Alert, Platform, Text } from 'react-native';
import { Inter_400Regular, useFonts } from '@expo-google-fonts/inter';
import { confirmDelete } from './src/components/ConfirmDialog';
import { AdminScreen } from './src/screens/AdminScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { UserFormScreen } from './src/screens/UserFormScreen';
import { ADMIN_EMAIL, addUser, deleteUser, emailExists, login, subscribeUsers, updateUser } from './src/services/userService';
import type { User, UserFields } from './src/types';

const textDefaults = Text as typeof Text & { defaultProps?: { style?: unknown } };
textDefaults.defaultProps = { ...textDefaults.defaultProps, style: [{ fontFamily: 'Inter_400Regular' }, textDefaults.defaultProps?.style] };

export default function App() {
  const [fontsLoaded] = useFonts({ Inter_400Regular });
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    if (!currentUser || Platform.OS !== 'web' || currentUser.email !== ADMIN_EMAIL) return undefined;
    setIsLoading(true);
    return subscribeUsers(
      (nextUsers) => { setUsers(nextUsers); setIsLoading(false); },
      () => { setIsLoading(false); Alert.alert('Lỗi Firestore', 'Không thể tải dữ liệu người dùng theo thời gian thực.'); },
    );
  }, [currentUser]);

  if (!fontsLoaded) return null;

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const user = await login(email, password);
      setCurrentUser(user);
      return user;
    } catch (error) {
      Alert.alert('Lỗi kết nối', 'Không thể kết nối Firestore. Hãy kiểm tra cấu hình Firebase.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveUser = async (data: UserFields) => {
    setIsLoading(true);
    try {
      if (await emailExists(data.email, editingUser?.id)) {
        Alert.alert('Email da ton tai', 'Hay chon email khac.');
        return;
      }
      if (editingUser) await updateUser(editingUser.id, data);
      else await addUser(data);
      setIsFormOpen(false);
      setEditingUser(null);
    } catch (error) {
      Alert.alert('Không thể lưu', 'Hãy kiểm tra quyền Firestore và kết nối mạng.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (user: User) => confirmDelete(user.hoten || user.email, () => {
    setIsLoading(true);
    void deleteUser(user.id)
      .catch(() => Alert.alert('Không thể xóa', 'Hãy kiểm tra quyền Firestore.'))
      .finally(() => setIsLoading(false));
  });

  const handleProfileImage = async (image: string) => {
    if (!currentUser) return;
    setIsLoading(true);
    try {
      const updated = { ...currentUser, hinhanh: image };
      await updateUser(currentUser.id, updated);
      setCurrentUser(updated);
    } catch (error) {
      Alert.alert('Không thể cập nhật', 'Hãy kiểm tra quyền Firestore.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentUser) return <LoginScreen loading={isLoading} onLogin={handleLogin} />;
  if (Platform.OS === 'web' && currentUser.email === ADMIN_EMAIL) {
    return <>
      <AdminScreen
        loading={isLoading}
        onAdd={() => { setEditingUser(null); setIsFormOpen(true); }}
        onDelete={handleDelete}
        onEdit={(user) => { setEditingUser(user); setIsFormOpen(true); }}
        onLogout={() => setCurrentUser(null)}
        users={users}
      />
      <UserFormScreen
        loading={isLoading}
        onClose={() => { setIsFormOpen(false); setEditingUser(null); }}
        onSave={handleSaveUser}
        user={editingUser}
        visible={isFormOpen}
      />
    </>;
  }
  return <ProfileScreen loading={isLoading} onLogout={() => setCurrentUser(null)} onUpdateImage={handleProfileImage} user={currentUser} />;
}
