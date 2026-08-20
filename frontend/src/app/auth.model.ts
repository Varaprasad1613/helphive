export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: 'MEMBER' | 'ADMIN';
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
