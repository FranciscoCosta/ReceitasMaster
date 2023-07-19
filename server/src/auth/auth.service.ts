import { ForbiddenException, Injectable } from '@nestjs/common';
import PrismaService from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    try {
      const hashedPassword = await argon2.hash(dto.password);
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hashedPassword,
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
      });
      return this.signToken(user.id, user.email);
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
    return this.signToken(user.id, user.email);
  }

  async signToken(userId: number, userEmail: string) {
    const payload = { sub: userId, email: userEmail };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '20m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}

export default AuthService;
