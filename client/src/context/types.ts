export interface User {
  id: string;
  role: string;
  email: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthContextType {
  login: (data: LoginData) => void;
  logout: () => void;
  user: User | null;
  isLoading: boolean
}