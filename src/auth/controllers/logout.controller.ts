import { Controller, HttpCode, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';

@Controller('auth/logout')
export class LogoutController {
  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(204)
  async execute(@Res({ passthrough: true }) response: Response) {
    response.cookie('access_token', null);

    return;
  }
}
