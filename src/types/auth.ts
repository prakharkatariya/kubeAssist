export interface LoginCredentials {
  domainId: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  session_id: string;
  user_info: UserInfo;
}

export interface UserInfo {
  id: string;
  domainId: string;
  email: string;
  displayName: string;
  role: string;
  permissions: string[];
}

export interface AuthContextType {
  user: UserInfo | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}