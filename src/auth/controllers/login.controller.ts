import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from '~/utils/password';
import { AuthUserRepository } from '../repositories/auth-user.repository';
import { LoginDto } from '../dtos/login.dto';

@Controller('auth/login')
export class LoginController {
  constructor(
    private jwtService: JwtService,
    private authUserRepository: AuthUserRepository,
  ) {}

  @Post()
  @HttpCode(201)
  async invoke(@Body() loginDto: LoginDto) {
    const authUser = await this.authUserRepository.findAuthUserByPublicId(
      loginDto.publicId,
    );

    if (
      !authUser ||
      !comparePassword(loginDto.password, authUser.hashedPassword)
    ) {
      return null;
    }

    const payload = { publicId: authUser.publicId, sub: authUser.userId };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
