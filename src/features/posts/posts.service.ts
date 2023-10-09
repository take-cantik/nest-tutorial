import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { PrismaService } from '~/prisma.service';

@Injectable()
export class PostService extends PrismaService {
  constructor(private prisma: PrismaService) {
    super();
  }

  async findPostByPostId({
    postId,
  }: Prisma.PostWhereUniqueInput): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: { postId },
    });
  }
}
