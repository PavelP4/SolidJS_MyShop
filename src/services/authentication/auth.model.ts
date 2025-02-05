export interface AuthResult {
  isAuthenticated: boolean;
  user: UserProfile;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  age: number;
}