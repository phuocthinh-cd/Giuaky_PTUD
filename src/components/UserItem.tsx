import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { User } from '../types';

type Props = {
  user: User;
  onEdit: () => void;
  onDelete: () => void;
};

export function UserItem({ user, onEdit, onDelete }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.avatarCell}>{user.hinhanh ? <Image source={{ uri: user.hinhanh }} style={styles.avatar} /> : <View style={styles.avatarFallback}><Text style={styles.avatarText}>{user.hoten.charAt(0).toUpperCase() || '?'}</Text></View>}</View>
      <Text style={styles.name}>{user.hoten || 'Chưa có họ tên'}</Text><Text style={styles.email}>{user.email}</Text><Text style={styles.password}>{user.matkhau}</Text>
      <View style={styles.actions}>
        <Pressable accessibilityLabel="Sửa người dùng" onPress={onEdit} style={styles.iconButton}><MaterialCommunityIcons color="#4F46E5" name="pencil-outline" size={19} /></Pressable>
        <Pressable accessibilityLabel="Xóa người dùng" onPress={onDelete} style={styles.iconButton}><MaterialCommunityIcons color="#B91C1C" name="trash-can-outline" size={19} /></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { alignItems: 'center', borderBottomColor: '#E5E7EB', borderBottomWidth: 1, flexDirection: 'row', minHeight: 70, paddingHorizontal: 18 }, avatarCell: { flex: 0.7 },
  avatar: { backgroundColor: '#EEF0FF', borderRadius: 20, height: 40, width: 40 }, avatarFallback: { alignItems: 'center', backgroundColor: '#EEF0FF', borderRadius: 20, height: 40, justifyContent: 'center', width: 40 }, avatarText: { color: '#3730A3', fontSize: 15, fontWeight: '800' },
  name: { color: '#111827', flex: 1, fontSize: 14, fontWeight: '700', marginLeft: 16 }, email: { color: '#4B5563', flex: 1, fontSize: 13 }, password: { color: '#4B5563', flex: 1, fontSize: 13 }, actions: { alignItems: 'center', flex: 0.8, flexDirection: 'row', gap: 14, justifyContent: 'flex-end' }, iconButton: { alignItems: 'center', minHeight: 44, justifyContent: 'center', minWidth: 30 }
});