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
            id: 101,
            name: "Jhon Smith",
            email: "j.smith@trump-corporation.net",
            age: 32
          }
        };
        resolve(result);
      }, 10);
    }) 
  }
}

const authService = new AuthService();

export default authService;