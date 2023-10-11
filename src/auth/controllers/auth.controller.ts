import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { AuthUser } from '../domain/enitites/auth-user.entity';
import { SignUpDto } from '../dtos/sign-up.dto';
import { generateUuid } from '~/utils/uuid';
import { hashPassword } from '~/utils/password';
import { now } from '~/utils/day';
import { AuthUserRepository } from '../repositories/auth-user.repository';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private authUserRepository: AuthUserRepository,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(201)
  async login(@Request() request: { authUser: AuthUser }) {
    return this.authService.login(request.authUser);
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

    return this.authService.login(authUser);
  }
}
