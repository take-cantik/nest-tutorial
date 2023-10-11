import { Module } from '@nestjs/common';
import { PostController } from './controllers/posts.controller';
import { PostRepository } from './repositories/posts.repository';
import { PrismaModule, PrismaService } from 'nestjs-prisma';

@Module({
  imports: [PrismaModule],
  controllers: [PostController],
  providers: [PostRepository, PrismaService],
})
export class PostModule {}
