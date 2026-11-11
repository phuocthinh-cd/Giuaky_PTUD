import { Alert, Platform } from 'react-native';

export function confirmDelete(name: string, onConfirm: () => void) {
  if (Platform.OS === 'web') {
    if (window.confirm(`Bạn có chắc muốn xóa ${name}?`)) onConfirm();
    return;
  }
  Alert.alert('Xóa người dùng', `Bạn có chắc muốn xóa ${name}?`, [
    { text: 'Hủy', style: 'cancel' },
    { text: 'Xóa', style: 'destructive', onPress: onConfirm },
  ]);
}