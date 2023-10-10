import { PrismaService } from '~/services/prisma.service';
import { AuthUser } from '../domain/enitites/auth-user.entity';

export class AuthUserRepository {
  constructor(private prisma: PrismaService) {}

  async createAuthUser(authUser: AuthUser): Promise<void> {
    await this.prisma.user.create({
      data: {
        userId: authUser.userId,
        publicId: authUser.publicId,
        username: '名無し',
        password: authUser.hashedPassword,
        createdAt: authUser.createdAt,
        updatedAt: authUser.updatedAt,
      },
    });
  }
}
