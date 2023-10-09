import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { PostService } from './posts.service';
import { PrismaService } from '~/prisma.service';
import { generateUuid } from '~/utils/uuid';

describe('PostService', () => {
  let postService: PostService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [PostService, PrismaService],
    }).compile();

    postService = app.get<PostService>(PostService);
  });

  describe('findPostByPostId', () => {
    it('特定のIDのポストを取得できること', async () => {
      const db = new PrismaClient();
      const postId = generateUuid();
      const expected = await db.post.create({
        data: {
          postId: postId,
          title: 'post-test',
          body: 'post-body',
        },
      });

      const result = await postService.findPostByPostId({ postId });
      expect(result).toStrictEqual(expected);
    });
  });
});