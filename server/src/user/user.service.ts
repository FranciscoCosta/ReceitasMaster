import { Injectable } from '@nestjs/common';
import PrismaService from '../prisma/prisma.service';
import { EditUserDto } from './dto';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(userId: number, dto: EditUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
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
