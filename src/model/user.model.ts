interface userDetail {
  id: number;
  name: string;
  email: string;
  role: string;
}

// Tipe data yang bisa berupa userDetail atau null
export type UserDetailInterface = userDetail | null;

export interface AuthResponse {
  data: {
    id: number;
    name: string;
    email: string;
    created_at: Date;
    updated_at: Date;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
  role?: string;
}
