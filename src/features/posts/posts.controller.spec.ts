import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './posts.service';
import { generateUuid } from '~/utils/uuid';
import { PostController } from './posts.controller';
import { NotFoundException } from '@nestjs/common';

describe('PostController', () => {
  let postController: PostController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        {
          provide: PostService,
          useFactory: () => new PostService(jestPrisma.client),
        },
      ],
    }).compile();

    postController = app.get<PostController>(PostController);
  });

  describe('findById', () => {
    it('特定のIDのポストを取得できること', async () => {
      const db = jestPrisma.client;
      const postId = generateUuid();
      const expected = await db.post.create({
        data: {
          postId: postId,
          title: 'post-test',
          body: 'post-body',
        },
      });

      const result = await postController.findById(postId);
      expect(result).toStrictEqual({ post: expected });
    });

    it('特定のIDのポストが存在しない場合はNotFoundExceptionを取得できること', async () => {
      const postId = generateUuid();

      await expect(postController.findById(postId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});