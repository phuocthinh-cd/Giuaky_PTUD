import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { User } from '../types';

type Props = { loading: boolean; onLogin: (email: string, password: string) => Promise<User | null> };

export function LoginScreen({ loading, onLogin }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const submit = async () => {
    setMessage('');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || !password.trim()) {
      setMessage('Email phải đúng định dạng và mật khẩu không được rỗng.');
      return;
    }
    const user = await onLogin(email, password);
    if (!user) setMessage('Email hoặc mật khẩu không đúng, hoặc tài khoản không tồn tại.');
  };

  return <SafeAreaView style={styles.safeArea}><StatusBar style="light" /><View style={styles.split}><View style={styles.intro}><View style={styles.mark}><MaterialCommunityIcons color="#fff" name="account-group-outline" size={28} /></View><Text style={styles.eyebrow}>USERFLOW</Text><Text style={styles.introTitle}>Quản lý người dùng đơn giản hơn.</Text><Text style={styles.introText}>Một không gian gọn gàng để theo dõi và cập nhật thông tin tài khoản.</Text></View><KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.formSide}><ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
    <Text style={styles.eyebrowForm}>CHÀO MỪNG TRỞ LẠI</Text><Text style={styles.title}>Đăng nhập</Text><Text style={styles.subtitle}>Đăng nhập để tiếp tục quản lý người dùng.</Text>
    <Text style={styles.label}>Email</Text><TextInput autoCapitalize="none" keyboardType="email-address" onChangeText={setEmail} placeholder="example@gmail.com" placeholderTextColor="#9CA3AF" style={styles.input} value={email} />
    <Text style={styles.label}>Mật khẩu</Text><TextInput onChangeText={setPassword} placeholder="Nhập mật khẩu" placeholderTextColor="#9CA3AF" secureTextEntry style={styles.input} value={password} />
    <Pressable disabled={loading} onPress={() => void submit()} style={styles.button}><Text style={styles.buttonText}>{loading ? 'Đang xử lý...' : 'Đăng nhập'}</Text><MaterialCommunityIcons color="#fff" name="arrow-right" size={19} /></Pressable>{message ? <Text style={styles.message}>{message}</Text> : null}
  </ScrollView></KeyboardAvoidingView></View></SafeAreaView>;
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#F4F5FA', flex: 1 }, split: { flex: 1, flexDirection: 'row' }, intro: { backgroundColor: '#4F46E5', display: Platform.OS === 'web' ? 'flex' : 'none', flex: 1, justifyContent: 'center', padding: 64 }, mark: { alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.16)', borderRadius: 14, height: 56, justifyContent: 'center', marginBottom: 30, width: 56 }, eyebrow: { color: '#C7D2FE', fontSize: 12, fontWeight: '800', letterSpacing: 1.6, marginBottom: 12 }, introTitle: { color: '#fff', fontSize: 42, fontWeight: '800', lineHeight: 50, maxWidth: 470 }, introText: { color: '#E0E7FF', fontSize: 16, lineHeight: 25, marginTop: 20, maxWidth: 400 }, formSide: { flex: 1, maxWidth: 600 }, page: { flexGrow: 1, justifyContent: 'center', maxWidth: 360, padding: 32, width: '100%' }, eyebrowForm: { color: '#4F46E5', fontSize: 11, fontWeight: '800', letterSpacing: 1.2, marginBottom: 10 }, title: { color: '#111827', fontSize: 34, fontWeight: '800' }, subtitle: { color: '#4B5563', fontSize: 15, lineHeight: 23, marginTop: 9 }, label: { color: '#111827', fontSize: 13, fontWeight: '700', marginBottom: 8, marginTop: 22 }, input: { backgroundColor: '#fff', borderColor: '#E5E7EB', borderRadius: 12, borderWidth: 1, color: '#111827', fontSize: 15, minHeight: 44, paddingHorizontal: 14 }, button: { alignItems: 'center', backgroundColor: '#4F46E5', borderRadius: 12, flexDirection: 'row', justifyContent: 'center', marginTop: 28, minHeight: 48 }, buttonText: { color: '#fff', fontSize: 15, fontWeight: '800', marginRight: 8 }, message: { color: '#B91C1C', fontSize: 13, lineHeight: 20, marginTop: 14, textAlign: 'center' },
});