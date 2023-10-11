import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthUserRepository } from './repositories/auth-user.repository';
import { PrismaService } from '~/services/prisma.service';
import { SignUpController } from './controllers/sign-up.controller';
import { jwtConstants } from '~/utils/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [JwtStrategy, AuthUserRepository, PrismaService],
  controllers: [SignUpController],
})
export class AuthUserModule {}
