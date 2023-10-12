import { Module } from '@nestjs/common';
import { FindByIdPostController } from './controllers/find-by-id-post.controller';
import { PostRepository } from './repositories/posts.repository';
import { PrismaModule, PrismaService } from 'nestjs-prisma';

@Module({
  imports: [PrismaModule],
  controllers: [FindByIdPostController],
  providers: [PostRepository, PrismaService],
})
export class PostModule {}
