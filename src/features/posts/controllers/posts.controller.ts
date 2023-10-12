import {
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { PostRepository } from '../repositories/posts.repository';
import { JwtAuthGuard } from '~/auth/jwt/jwt-auth.guard';

@Controller('posts')
export class PostController {
  constructor(private readonly postRepository: PostRepository) {}

  @UseGuards(JwtAuthGuard)
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
