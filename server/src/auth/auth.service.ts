import { Injectable } from '@nestjs/common';

@Injectable({})
class AuthService {
  login() {
    return 'Login';
  }
  signup() {
    return 'Signup';
  }
}

export default AuthService;
