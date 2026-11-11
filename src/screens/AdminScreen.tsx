import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { User } from '../types';
import { UserItem } from '../components/UserItem';

type Props = { users: User[]; loading: boolean; onAdd: () => void; onEdit: (user: User) => void; onDelete: (user: User) => void; onLogout: () => void };

export function AdminScreen({ users, loading, onAdd, onEdit, onDelete, onLogout }: Props) {
  const [search, setSearch] = useState('');
  const filteredUsers = useMemo(() => users.filter((user) => `${user.hoten} ${user.email}`.toLowerCase().includes(search.toLowerCase())), [search, users]);
  return <SafeAreaView style={styles.safe}><StatusBar style="dark" /><View style={styles.shell}>
    <View style={styles.sidebar}>
      <View style={styles.brand}><View style={styles.brandMark}><MaterialCommunityIcons color="#fff" name="account-group-outline" size={20} /></View><Text style={styles.brandText}>UserFlow</Text></View>
      <Text style={styles.sideLabel}>QUẢN LÝ</Text>
      <View style={styles.activeNav}><MaterialCommunityIcons color="#3730A3" name="account-multiple-outline" size={19} /><Text style={styles.activeNavText}>Người dùng</Text></View>
      <Pressable onPress={onLogout} style={styles.sideLogout}><MaterialCommunityIcons color="#4B5563" name="logout-variant" size={19} /><Text style={styles.sideLogoutText}>Đăng xuất</Text></Pressable>
    </View>
    <View style={styles.main}>
      <View style={styles.topbar}><View><Text style={styles.eyebrow}>QUẢN TRỊ HỆ THỐNG</Text><Text style={styles.title}>Người dùng</Text><Text style={styles.subtitle}>Quản lý danh sách tài khoản trong hệ thống.</Text></View><Pressable onPress={onAdd} style={styles.add}><MaterialCommunityIcons color="#fff" name="plus" size={19} /><Text style={styles.addText}>Thêm người dùng</Text></Pressable></View>
      <View style={styles.toolbar}><View style={styles.searchWrap}><MaterialCommunityIcons color="#9CA3AF" name="magnify" size={20} /><TextInput onChangeText={setSearch} placeholder="Tìm theo họ tên hoặc email" placeholderTextColor="#9CA3AF" style={styles.search} value={search} /></View><Text style={styles.count}>{users.length} tài khoản</Text></View>
      <View style={styles.table}><View style={styles.tableHeader}><Text style={[styles.column, styles.avatarColumn]}>HÌNH ẢNH</Text><Text style={styles.column}>HỌ TÊN</Text><Text style={styles.column}>EMAIL</Text><Text style={styles.column}>MẬT KHẨU</Text><Text style={[styles.column, styles.actionColumn]}>THAO TÁC</Text></View>
        {loading ? <Text style={styles.status}>Đang tải dữ liệu...</Text> : <FlatList contentContainerStyle={styles.list} data={filteredUsers} keyExtractor={(item) => item.id} ListEmptyComponent={<Text style={styles.status}>Chưa có người dùng phù hợp.</Text>} renderItem={({ item }) => <UserItem onDelete={() => onDelete(item)} onEdit={() => onEdit(item)} user={item} />} />}
      </View>
    </View>
  </View></SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { backgroundColor: '#F4F5FA', flex: 1 }, shell: { flex: 1, flexDirection: 'row' }, sidebar: { backgroundColor: '#fff', borderRightColor: '#E5E7EB', borderRightWidth: 1, padding: 20, width: 230 }, brand: { alignItems: 'center', flexDirection: 'row', marginBottom: 42 }, brandMark: { alignItems: 'center', backgroundColor: '#4F46E5', borderRadius: 9, height: 34, justifyContent: 'center', width: 34 }, brandText: { color: '#111827', fontSize: 18, fontWeight: '800', marginLeft: 10 }, sideLabel: { color: '#9CA3AF', fontSize: 10, fontWeight: '800', letterSpacing: 1, marginBottom: 12 }, activeNav: { alignItems: 'center', backgroundColor: '#EEF0FF', borderRadius: 12, flexDirection: 'row', paddingHorizontal: 13, paddingVertical: 12 }, activeNavText: { color: '#3730A3', fontSize: 14, fontWeight: '700', marginLeft: 10 }, sideLogout: { alignItems: 'center', flexDirection: 'row', marginTop: 'auto', paddingHorizontal: 13, paddingVertical: 12 }, sideLogoutText: { color: '#4B5563', fontSize: 14, marginLeft: 10 }, main: { flex: 1, paddingHorizontal: 38, paddingTop: 34 }, topbar: { alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between' }, eyebrow: { color: '#6366F1', fontSize: 11, fontWeight: '800', letterSpacing: 1.2, marginBottom: 8 }, title: { color: '#111827', fontSize: 30, fontWeight: '800' }, subtitle: { color: '#4B5563', fontSize: 14, marginTop: 7 }, add: { alignItems: 'center', backgroundColor: '#4F46E5', borderRadius: 12, flexDirection: 'row', minHeight: 44, paddingHorizontal: 17 }, addText: { color: '#fff', fontSize: 14, fontWeight: '700', marginLeft: 7 }, toolbar: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }, searchWrap: { alignItems: 'center', backgroundColor: '#fff', borderColor: '#E5E7EB', borderRadius: 12, borderWidth: 1, flexDirection: 'row', paddingHorizontal: 13, width: 360 }, search: { color: '#111827', flex: 1, fontSize: 14, minHeight: 44, paddingHorizontal: 9 }, count: { color: '#4B5563', fontSize: 13 }, table: { backgroundColor: '#fff', borderColor: '#E5E7EB', borderRadius: 16, borderWidth: 1, flex: 1, marginTop: 18, overflow: 'hidden' }, tableHeader: { alignItems: 'center', backgroundColor: '#FAFAFC', borderBottomColor: '#E5E7EB', borderBottomWidth: 1, flexDirection: 'row', minHeight: 46, paddingHorizontal: 18 }, column: { color: '#6B7280', flex: 1, fontSize: 10, fontWeight: '800', letterSpacing: 0.6 }, avatarColumn: { flex: 0.7 }, actionColumn: { flex: 0.8, textAlign: 'right' }, list: { paddingBottom: 24 }, status: { color: '#4B5563', padding: 28, textAlign: 'center' }
});