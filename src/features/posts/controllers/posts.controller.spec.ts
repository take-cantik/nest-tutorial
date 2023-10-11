import { Test, TestingModule } from '@nestjs/testing';
import { generateUuid } from '~/utils/uuid';
import { PostController } from './posts.controller';
import { NotFoundException } from '@nestjs/common';
import { PostRepository } from '../repositories/posts.repository';
import { hashPassword } from '~/utils/password';

describe('PostController', () => {
  let postController: PostController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        {
          provide: PostRepository,
          useFactory: () => new PostRepository(jestPrisma.client),
        },
      ],
    }).compile();

    postController = app.get<PostController>(PostController);
  });

  describe('findById', () => {
    it('特定のIDのポストを取得できること', async () => {
      const db = jestPrisma.client;
      const user = await db.user.create({
        data: {
          userId: generateUuid(),
          publicId: 'take-cantik',
          username: 'みきみきどーざん',
          password: await hashPassword('ahiahi'),
        },
      });

      const postId = generateUuid();
      const expected = await db.post.create({
        data: {
          postId: postId,
          text: 'post-test',
          userId: user.userId,
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
