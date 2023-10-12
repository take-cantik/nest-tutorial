import { Controller, Get, HttpCode, Param, UseGuards } from '@nestjs/common';
import { PostRepository } from '../repositories/posts.repository';
import { JwtAuthGuard } from '~/auth/jwt/jwt-auth.guard';
import { FindByIdPostPresenter } from '../presenter/find-by-id-post.presenter';
import { ApiOkResponse } from '@nestjs/swagger';
import { FindByIdPostResponseDto } from '../dto/find-by-id-post.dto';

@Controller()
export class FindByIdPostController {
  constructor(private readonly postRepository: PostRepository) {}

  @UseGuards(JwtAuthGuard)
  @Get('posts/:postId')
  @HttpCode(200)
  @ApiOkResponse({ type: FindByIdPostResponseDto })
  async invoke(@Param('postId') postId: string) {
    const result = await this.postRepository.findPostByPostId({ postId });
    return FindByIdPostPresenter.output(result);
  }
}
