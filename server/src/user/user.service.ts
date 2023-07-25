import { Injectable } from '@nestjs/common';
import PrismaService from '../prisma/prisma.service';
import { EditUserDto } from './dto';
import * as argon2 from 'argon2';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(userId: number, dto: EditUserDto) {
    const { password, ...rest } = dto;

    if (password) {
      dto.hashedPassword = await argon2.hash(password);
    }

    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },

      data: {
        hashedPassword: dto.hashedPassword,
        ...rest,
      },
    });

    delete user.hashedPassword;

    return user;
  }

  async getUserById(userId: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    delete user.hashedPassword;
    return user;
  }
}
