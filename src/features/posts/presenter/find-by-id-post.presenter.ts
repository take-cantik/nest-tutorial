import { Post } from '../domain/entities/post.entity';
import { NotFoundException } from '@nestjs/common';
import { FindByIdPostResponseDto } from '../dto/find-by-id-post.dto';

export class FindByIdPostPresenter {
  static output(result: Post | null): FindByIdPostResponseDto {
    if (!result) throw new NotFoundException('Not Found Post');

    return {
      post: {
        postId: result.postId,
        text: result.text,
        author: {
          authorId: result.author.authorId,
          publicId: result.author.publicId,
          username: result.author.username,
        },
        replyConut: result.replyCollection.count(),
        replyList: result.replyCollection.all().map((reply) => ({
          replyId: reply.postId,
          text: reply.text,
          author: {
            authorId: reply.author.authorId,
            publicId: reply.author.publicId,
            username: reply.author.username,
          },
          replyConut: reply.replyCount,
        })),
      },
    } as FindByIdPostResponseDto;
  }
}
