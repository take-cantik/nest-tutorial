import {
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { PostRepository } from '../repositories/posts.repository';
import { JwtAuthGuard } from '~/auth/guard/jwt-auth.guard';
import { ApiHeader } from '@nestjs/swagger';

@Controller('posts')
export class PostController {
  constructor(private readonly postRepository: PostRepository) {}

  @ApiHeader({
    name: 'Authentication',
  })
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
