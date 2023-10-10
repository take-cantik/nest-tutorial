import { Test, TestingModule } from '@nestjs/testing';
import { PostRepository } from './posts.repository';
import { generateUuid } from '~/utils/uuid';

describe('PostRepository', () => {
  let postRepository: PostRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PostRepository,
          useFactory: () => new PostRepository(jestPrisma.client),
        },
      ],
    }).compile();

    postRepository = app.get<PostRepository>(PostRepository);
  });

  describe('findPostByPostId', () => {
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

      const result = await postRepository.findPostByPostId({ postId });
      expect(result).toStrictEqual(expected);
    });
  });
});
