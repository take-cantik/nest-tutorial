import { Injectable } from '@nestjs/common';
import { AuthUserRepository } from '../repositories/auth-user.repository';
import { comparePassword } from '~/utils/password';

@Injectable()
export class AuthService {
  constructor(private authUserRepository: AuthUserRepository) {}

  async validateAuthUser(
    publicId: string,
    password: string,
  ): Promise<string | null> {
    const user = await this.authUserRepository.findAuthUserByPublicId(publicId);

    if (!user || !comparePassword(password, user.hashedPassword)) {
      return null;
    }

    return user.userId;
  }
}
