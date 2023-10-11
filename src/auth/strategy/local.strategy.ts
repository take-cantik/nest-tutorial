import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';
import { AuthUser } from '../domain/enitites/auth-user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'publicId',
    });
  }

  async validate(publicId: string, password: string): Promise<AuthUser> {
    const authUser = await this.authService.validateAuthUser(
      publicId,
      password,
    );

    if (!authUser) {
      throw new UnauthorizedException();
    }
    return authUser;
  }
}
