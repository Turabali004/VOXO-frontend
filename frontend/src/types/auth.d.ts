export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    username: string;
    token?: string;
  };
  token?: string;
}

export interface User {
  id: string;
  username: string;
  name?: string;
  email?: string;
  avatar?: string;
}