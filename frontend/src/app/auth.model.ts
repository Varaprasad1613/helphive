export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: 'MEMBER' | 'ADMIN';
  createdAt?: string | null;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface ProfileInput { name: string; email: string; }
export interface PasswordChangeInput { currentPassword: string; newPassword: string; }
