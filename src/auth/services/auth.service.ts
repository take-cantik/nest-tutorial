import { Injectable } from '@nestjs/common';
import { AuthUserRepository } from '../repositories/auth-user.repository';
import { comparePassword } from '~/utils/password';
import { JwtService } from '@nestjs/jwt';
import { AuthUser } from '../domain/enitites/auth-user.entity';

@Injectable()
export class AuthService {
  constructor(
    private authUserRepository: AuthUserRepository,
    private jwtService: JwtService,
  ) {}

  async validateAuthUser(
    publicId: string,
    password: string,
  ): Promise<AuthUser | null> {
    const authUser = await this.authUserRepository.findAuthUserByPublicId(
      publicId,
    );

    if (!authUser || !comparePassword(password, authUser.hashedPassword)) {
      return null;
    }

    return authUser;
  }

  async login(authUser: AuthUser) {
    const payload = { publicId: authUser.publicId, sub: authUser.userId };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
