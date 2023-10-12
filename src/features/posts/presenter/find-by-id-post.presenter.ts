import { Post } from '../domain/entities/post.entity';
import { NotFoundException } from '@nestjs/common';

type FindByIdPostOutPut = {
  postId: string;
  text: string;
  author: {
    authorId: string;
    publicId: string;
    username: string;
  };
  replyConut: number;
  replyList: Array<{
    replyId: string;
    text: string;
    author: {
      authorId: string;
      publicId: string;
      username: string;
    };
    replyConut: number;
  }>;
};

export class FindByIdPostPresenter {
  static output(result: Post | null): FindByIdPostOutPut {
    if (!result) throw new NotFoundException('Not Found Post');

    return {
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
    };
  }
}
