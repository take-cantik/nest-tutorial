import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '~/services/prisma.service';

describe('PostController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(jestPrisma.client)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/:postId (GET)', async () => {
    const expected = {
      post: {
        postId: 'd5863e08-36b7-461b-8f05-96fbfe732c13',
        title: 'post-test',
        body: 'post-body',
        createdAt: '2023-10-10T04:06:31.715Z',
        updatedAt: '2023-10-10T04:06:31.715Z',
      },
    };

    return request(app.getHttpServer())
      .get(`/posts/${expected.post.postId}`)
      .expect(200)
      .expect(expected);
  });
});
