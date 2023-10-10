import { Module } from '@nestjs/common';
import { PrismaService } from '~/services/prisma.service';
import { PostController } from './controllers/posts.controller';
import { PostService } from './services/posts.service';

@Module({
  imports: [],
  controllers: [PostController],
  providers: [PostService, PrismaService],
})
export class PostModule {}
