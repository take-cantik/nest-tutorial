import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthUserRepository } from './repositories/auth-user.repository';
import { jwtConstants } from '~/utils/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { PrismaModule, PrismaService } from 'nestjs-prisma';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    LocalStrategy,
    JwtStrategy,
    AuthService,
    AuthUserRepository,
    PrismaService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
