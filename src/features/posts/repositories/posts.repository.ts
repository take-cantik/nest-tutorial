import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class PostRepository {
  constructor(private prisma: PrismaService) {}

  async findPostByPostId({
    postId,
  }: Prisma.PostWhereUniqueInput): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: { postId },
    });
  }
}
