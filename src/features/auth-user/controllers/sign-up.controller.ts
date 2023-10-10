import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthUserRepository } from '../repositories/auth-user.repository';
import { SignUpDto } from '../dtos/sign-up.dto';
import { AuthUser } from '../domain/enitites/auth-user.entity';
import { generateUuid } from '~/utils/uuid';
import { hashPassword } from '~/utils/password';
import { now } from '~/utils/day';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class SignUpController {
  constructor(
    private authUserRepository: AuthUserRepository,
    private jwtService: JwtService,
  ) {}

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

    const accessToken = this.jwtService.sign({
      sub: authUser.userId,
      publicId: authUser.publicId,
    });

    return { accessToken };
  }
}
