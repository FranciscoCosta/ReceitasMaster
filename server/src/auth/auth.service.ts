import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon2 from 'argon2';

@Injectable({})
class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    try {
      const hashedPassword = await argon2.hash(dto.password);
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hashedPassword,
        },
      });
      delete user.hashedPassword;
      return user;
    } catch (err) {
      if (err.code === 'P2002') {
        throw new ForbiddenException('Email já se encontra em uso.');
      }
      throw err;
    }
  }
  async signin(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Email ou senha inválidos.');
    }
    const isPasswordValid = await argon2.verify(
      user.hashedPassword,
      dto.password,
    );
    if (!isPasswordValid) {
      throw new ForbiddenException('Email ou senha inválidos.');
    }
    delete user.hashedPassword;
    return user;
  }
}

export default AuthService;
