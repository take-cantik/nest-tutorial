import { PrismaService } from '~/services/prisma.service';
import { AuthUser } from '../domain/enitites/auth-user.entity';
import { formatToStringFromDate } from '~/utils/day';

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
        createdAt: authUser.createdAt,
        updatedAt: authUser.updatedAt,
      },
    });
  }
}
