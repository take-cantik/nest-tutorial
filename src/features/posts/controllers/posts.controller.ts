import {
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { PostRepository } from '../repositories/posts.repository';

@Controller('posts')
export class PostController {
  constructor(private readonly postRepository: PostRepository) {}

  @Get(':postId')
  @HttpCode(200)
  async findById(@Param('postId') postId: string) {
    const result = await this.postRepository.findPostByPostId({ postId });
    if (!result) {
      throw new NotFoundException('Not Found Post.');
    }

    return {
      post: result,
    };
  }
}