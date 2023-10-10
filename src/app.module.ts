import { Module } from '@nestjs/common';
import { HealthCheckModule } from './features/health-check/health-check.module';
import { PostModule } from './features/posts/posts.module';

@Module({
  imports: [HealthCheckModule, PostModule],
})
export class AppModule {}
