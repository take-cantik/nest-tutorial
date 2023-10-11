import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthUser } from '../domain/enitites/auth-user.entity';
import { SignUpDto } from '../dtos/sign-up.dto';
import { generateUuid } from '~/utils/uuid';
import { hashPassword } from '~/utils/password';
import { now } from '~/utils/day';
import { AuthUserRepository } from '../repositories/auth-user.repository';
import { LoginDto } from '../dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private authUserRepository: AuthUserRepository,
  ) {}

  @Post('login')
  @HttpCode(201)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.publicId, loginDto.password);
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

    return this.authService.signup(authUser);
  }
}
