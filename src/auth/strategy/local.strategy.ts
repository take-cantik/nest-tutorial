import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'publicId',
    });
  }

  async validate(publicId: string, password: string): Promise<string> {
    const userId = await this.authService.validateAuthUser(publicId, password);
    if (!userId) {
      throw new UnauthorizedException();
    }
    return userId;
  }
}
