import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.appUser.findUnique({
    where: { email },
    select: {
        id: true,
        email: true,
        passwordHash: true,
        role: true,
        isActive: true,
      },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      sub: user.id,
      role: String(user.role),
      email: user.email,
    };

    const accessToken = this.jwt.sign(payload as Record<string, any>, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: Number(process.env.JWT_ACCESS_EXPIRES ?? 900),
    });

    const refreshToken = this.jwt.sign(payload as Record<string, any>, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: Number(process.env.JWT_REFRESH_EXPIRES ?? 604800),
    });

    const tokenHash = await bcrypt.hash(refreshToken, 10);
    const expiresAt = new Date(
      Date.now() + Number(process.env.JWT_REFRESH_EXPIRES ?? 604800) * 1000,
    );

    await this.prisma.appRefreshToken.create({
      data: {
        tokenHash,
        expiresAt,
        userId: user.id,
      },
    });

    return {
      accessToken,
      refreshToken,
      role: user.role,
    };
  }
}
