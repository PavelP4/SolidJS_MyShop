import {AuthResult} from "./auth.model";

class AuthService {
  constructor() {
    
  }

  public authenticate(userName: string, password: string): Promise<AuthResult> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = {
          isAuthenticated: userName === 'admin',
          user: {
            userId: 101,
            userName: "Jhon Smith"
          }
        };
        resolve(result);
      }, 2000);
    }) 
  }
}

const authService = new AuthService();

export default authService;