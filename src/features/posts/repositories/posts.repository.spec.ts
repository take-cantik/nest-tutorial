import { Test, TestingModule } from '@nestjs/testing';
import { PostRepository } from './posts.repository';
import { generateUuid } from '~/utils/uuid';
import { hashPassword } from '~/utils/password';
import { PrismaService } from 'nestjs-prisma';

describe('PostRepository', () => {
  let postRepository: PostRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        PostRepository,
        {
          provide: PrismaService,
          useFactory: () => jestPrisma.client,
        },
      ],
    }).compile();

    postRepository = app.get<PostRepository>(PostRepository);
  });

  describe('findPostByPostId', () => {
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

      const result = await postRepository.findPostByPostId({ postId });
      expect(result).toStrictEqual(expected);
    });
  });
});
