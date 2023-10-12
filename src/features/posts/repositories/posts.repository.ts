import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { Post } from '../domain/entities/post.entity';
import { Author } from '../domain/value-objects/author.value-object';
import { ReplyCollection } from '../domain/entities/reply-collection.entity';
import { formatToStringFromDate } from '~/utils/day';
import { Reply } from '../domain/value-objects/reply.value-object';

@Injectable()
export class PostRepository {
  constructor(private prisma: PrismaService) {}

  async findPostByPostId({
    postId,
  }: Prisma.PostWhereUniqueInput): Promise<Post | null> {
    const result = await this.prisma.post.findUnique({
      where: { postId },
      include: {
        user: true,
        replyFrom: {
          include: {
            from: {
              include: {
                user: true,
                _count: {
                  select: {
                    replyFrom: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!result) return null;

    return new Post(
      result.postId,
      result.text,
      formatToStringFromDate(result.createdAt),
      formatToStringFromDate(result.updatedAt),
      new Author(
        result.user.userId,
        result.user.publicId,
        result.user.username,
      ),
      new ReplyCollection(
        result.postId,
        result.replyFrom.map(
          (reply) =>
            new Reply(
              reply.from.postId,
              reply.from.text,
              reply.from._count.replyFrom,
              result.postId,
              new Author(
                reply.from.user.userId,
                reply.from.user.publicId,
                reply.from.user.username,
              ),
              formatToStringFromDate(reply.from.createdAt),
              formatToStringFromDate(reply.from.updatedAt),
            ),
        ),
      ),
    );
  }
}
