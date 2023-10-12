import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthUser } from '../enitites/auth-user.entity';
import { SignUpDto } from '../dtos/sign-up.dto';
import { generateUuid } from '~/utils/uuid';
import { hashPassword } from '~/utils/password';
import { now } from '~/utils/day';
import { AuthUserRepository } from '../repositories/auth-user.repository';
import { Response } from 'express';

@Controller('auth/sign-up')
export class SignUpController {
  constructor(
    private jwtService: JwtService,
    private authUserRepository: AuthUserRepository,
  ) {}

  @Post()
  @HttpCode(201)
  async invoke(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) response: Response,
  ) {
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

    response.cookie('access_token', this.jwtService.sign(payload));

    return;
  }
}
