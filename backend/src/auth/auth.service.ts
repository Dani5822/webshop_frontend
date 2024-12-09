import { Injectable, Req } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { IsEmail } from 'class-validator';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(username: string, password: string, email: string ) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await this.prisma.user.create({
    data: {
      username: username,
      email: email,
      password: hashedPassword,
    },
  });
  return { message: 'User registered successfully', userId: user.id };
}

  async validateUser(username: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async getProfile(username: string) { 
    const user = await this.prisma.user.findUnique({
      where: { username: username },
      select: { id: true, username: true, email: true },
    });

    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
