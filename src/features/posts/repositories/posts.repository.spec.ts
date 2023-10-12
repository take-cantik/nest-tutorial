import { Test, TestingModule } from '@nestjs/testing';
import { PostRepository } from './posts.repository';
import { generateUuid } from '~/utils/uuid';
import { hashPassword } from '~/utils/password';
import { PrismaService } from 'nestjs-prisma';
import { Post } from '../domain/entities/post.entity';
import { formatToStringFromDate } from '~/utils/day';
import { ReplyCollection } from '../domain/entities/reply-collection.entity';
import { Author } from '../domain/value-objects/author.value-object';

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

      const post = await db.post.create({
        data: {
          postId: generateUuid(),
          text: 'post-test',
          userId: user.userId,
        },
      });

      const expected = new Post(
        post.postId,
        post.text,
        formatToStringFromDate(post.createdAt),
        formatToStringFromDate(post.updatedAt),
        new Author(user.userId, user.publicId, user.username),
        new ReplyCollection(post.postId, []),
      );

      const result = await postRepository.findPostByPostId({
        postId: post.postId,
      });
      expect(result).toStrictEqual(expected);
    });
  });
});
