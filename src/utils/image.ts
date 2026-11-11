import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';

const MAX_IMAGE_WIDTH = 400;

export async function pickAndCompressImage(source: 'camera' | 'library' = 'library'): Promise<string | null> {
  const permission = source === 'camera'
    ? await ImagePicker.requestCameraPermissionsAsync()
    : await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) {
    throw new Error(source === 'camera' ? 'Cần cấp quyền sử dụng camera.' : 'Cần cấp quyền truy cập thư viện ảnh.');
  }

  const result = source === 'camera'
    ? await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      base64: true,
      quality: 0.3,
      mediaTypes: ['images'],
    })
    : await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    base64: true,
    quality: 0.3,
    mediaTypes: ['images'],
  });

  if (result.canceled || !result.assets[0]) {
    return null;
  }

  const asset = result.assets[0];
  const actions = asset.width > MAX_IMAGE_WIDTH
    ? [{ resize: { width: MAX_IMAGE_WIDTH } }]
    : [];
  const compressed = await ImageManipulator.manipulateAsync(asset.uri, actions, {
    compress: 0.3,
    format: ImageManipulator.SaveFormat.JPEG,
    base64: true,
  });

  if (!compressed.base64) {
    throw new Error('Không thể đọc dữ liệu ảnh.');
  }

  return `data:image/jpeg;base64,${compressed.base64}`;
}