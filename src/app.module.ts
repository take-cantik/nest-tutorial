import { Module } from '@nestjs/common';
import { HealthCheckModule } from './features/health-check/health-check.module';
import { PostModule } from './features/posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [HealthCheckModule, PostModule, AuthModule, PrismaModule.forRoot()],
})
export class AppModule {}
