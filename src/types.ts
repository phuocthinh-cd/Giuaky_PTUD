export type User = {
  id: string;
  email: string;
  matkhau: string;
  hoten: string;
  hinhanh: string;
};

export type UserFields = Omit<User, 'id'>;