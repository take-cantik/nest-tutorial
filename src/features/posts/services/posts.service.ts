import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { PrismaService } from '~/services/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async findPostByPostId({
    postId,
  }: Prisma.PostWhereUniqueInput): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: { postId },
    });
  }
}
