import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({})
class AuthService {
  constructor(private prisma: PrismaService) {}
  signin() {
    return 'Login';
  }
  signup() {
    return 'Signup';
  }
}

export default AuthService;
