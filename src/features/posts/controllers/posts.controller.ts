import {
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { PostService } from '../services/posts.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':postId')
  @HttpCode(200)
  async findById(@Param('postId') postId: string) {
    const result = await this.postService.findPostByPostId({ postId });
    if (!result) {
      throw new NotFoundException('Not Found Post.');
    }

    return {
      post: result,
    };
  }
}
