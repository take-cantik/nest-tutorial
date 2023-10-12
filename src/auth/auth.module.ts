import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthUserRepository } from './repositories/auth-user.repository';
import { jwtConstants } from '~/utils/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { PrismaModule, PrismaService } from 'nestjs-prisma';
import { LoginController } from './controllers/login.controller';
import { SignUpController } from './controllers/sign-up.controller';
import { LogoutController } from './controllers/logout.controller';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [JwtStrategy, AuthUserRepository, PrismaService],
  exports: [JwtModule],
  controllers: [LoginController, SignUpController, LogoutController],
})
export class AuthModule {}
