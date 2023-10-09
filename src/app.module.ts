import { Module } from '@nestjs/common';
import { HealthCheckModule } from './features/health-check/health-check.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [HealthCheckModule],
  providers: [PrismaService],
})
export class AppModule {}
