export interface AuthResult {
  isAuthenticated: boolean;
  user: UserProfile;
}

export interface UserProfile {
  userId: number;
  userName: string;
}