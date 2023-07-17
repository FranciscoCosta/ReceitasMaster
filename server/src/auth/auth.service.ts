import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable({})
class AuthService {
  constructor(private prisma: PrismaService) {}
  signup(dto: AuthDto) {
    return 'Signup';
  }
  signin() {
    return 'Login';
  }
}

export default AuthService;
