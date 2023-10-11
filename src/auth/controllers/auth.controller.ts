import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthUser } from '../enitites/auth-user.entity';
import { SignUpDto } from '../dtos/sign-up.dto';
import { generateUuid } from '~/utils/uuid';
import { hashPassword, comparePassword } from '~/utils/password';
import { now } from '~/utils/day';
import { AuthUserRepository } from '../repositories/auth-user.repository';
import { LoginDto } from '../dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    private authUserRepository: AuthUserRepository,
  ) {}

  @Post('login')
  @HttpCode(201)
  async login(@Body() loginDto: LoginDto) {
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

  @Post('sign-up')
  @HttpCode(201)
  async invoke(@Body() signUpDto: SignUpDto) {
    const { publicId, password } = signUpDto;

    const authUser = new AuthUser(
      generateUuid(),
      publicId,
      await hashPassword(password),
      now(),
      now(),
    );

    await this.authUserRepository.createAuthUser(authUser);

    const payload = { publicId: authUser.publicId, sub: authUser.userId };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
