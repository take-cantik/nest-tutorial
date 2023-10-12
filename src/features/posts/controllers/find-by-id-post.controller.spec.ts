import { Test, TestingModule } from '@nestjs/testing';
import { generateUuid } from '~/utils/uuid';
import { FindByIdPostController } from './find-by-id-post.controller';
import { NotFoundException } from '@nestjs/common';
import { PostRepository } from '../repositories/posts.repository';
import { hashPassword } from '~/utils/password';
import { PrismaService } from 'nestjs-prisma';

describe('FindByIdPostController', () => {
  let findByIdPostController: FindByIdPostController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FindByIdPostController],
      providers: [
        PostRepository,
        {
          provide: PrismaService,
          useFactory: () => jestPrisma.client,
        },
      ],
    }).compile();

    findByIdPostController = app.get<FindByIdPostController>(
      FindByIdPostController,
    );
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

      const post = await db.post.create({
        data: {
          postId: generateUuid(),
          text: 'post-test',
          userId: user.userId,
        },
      });

      const expected = {
        post: {
          postId: post.postId,
          text: post.text,
          author: {
            authorId: user.userId,
            publicId: user.publicId,
            username: user.username,
          },
          replyConut: 0,
          replyList: [],
        },
      };

      const result = await findByIdPostController.invoke(post.postId);
      expect(result).toStrictEqual(expected);
    });

    it('特定のIDのポストが存在しない場合はNotFoundExceptionを取得できること', async () => {
      const postId = generateUuid();

      await expect(findByIdPostController.invoke(postId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
