import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from '~/utils/password';
import { AuthUserRepository } from '../repositories/auth-user.repository';
import { LoginDto } from '../dtos/login.dto';
import { Response } from 'express';

@Controller('auth/login')
export class LoginController {
  constructor(
    private jwtService: JwtService,
    private authUserRepository: AuthUserRepository,
  ) {}

  @Post()
  @HttpCode(201)
  async invoke(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const authUser = await this.authUserRepository.findAuthUserByPublicId(
      loginDto.publicId,
    );

    if (
      !authUser ||
      !comparePassword(loginDto.password, authUser.hashedPassword)
    ) {
      throw new UnauthorizedException();
    }

    const payload = { publicId: authUser.publicId, sub: authUser.userId };

    response.cookie('access_token', this.jwtService.sign(payload));

    return;
  }
}
