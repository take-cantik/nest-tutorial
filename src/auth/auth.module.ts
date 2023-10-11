import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthUserRepository } from './repositories/auth-user.repository';
import { jwtConstants } from '~/utils/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
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
  providers: [JwtStrategy, AuthUserRepository, PrismaService],
  exports: [JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
