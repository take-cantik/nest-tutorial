import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { AuthUser } from '../enitites/auth-user.entity';
import { formatToDateFromString, formatToStringFromDate } from '~/utils/day';

@Injectable()
export class AuthUserRepository {
  constructor(private prisma: PrismaService) {}

  async findAuthUserByPublicId(publicId: string): Promise<AuthUser | null> {
    const result = await this.prisma.user.findUnique({
      where: { publicId },
    });

    if (!result) return null;

    return new AuthUser(
      result.userId,
      result.publicId,
      result.password,
      formatToStringFromDate(result.createdAt),
      formatToStringFromDate(result.updatedAt),
    );
  }

  async createAuthUser(authUser: AuthUser): Promise<void> {
    await this.prisma.user.create({
      data: {
        userId: authUser.userId,
        publicId: authUser.publicId,
        username: '名無し',
        password: authUser.hashedPassword,
        createdAt: formatToDateFromString(authUser.createdAt),
        updatedAt: formatToDateFromString(authUser.updatedAt),
      },
    });
  }
}
