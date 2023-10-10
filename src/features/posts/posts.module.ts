import { Module } from '@nestjs/common';
import { PrismaService } from '~/services/prisma.service';
import { PostController } from './controllers/posts.controller';
import { PostRepository } from './repositories/posts.repository';

@Module({
  imports: [],
  controllers: [PostController],
  providers: [PostRepository, PrismaService],
})
export class PostModule {}
