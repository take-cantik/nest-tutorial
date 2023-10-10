import { Injectable } from '@nestjs/common';
import { Post, Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaClient) {}

  async findPostByPostId({
    postId,
  }: Prisma.PostWhereUniqueInput): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: { postId },
    });
  }
}
