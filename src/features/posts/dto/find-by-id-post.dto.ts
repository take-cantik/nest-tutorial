import { ApiProperty } from '@nestjs/swagger';

class Author {
  @ApiProperty()
  authorId: string;

  @ApiProperty()
  publicId: string;

  @ApiProperty()
  username: string;
}

class Reply {
  @ApiProperty()
  replyId: string;

  @ApiProperty()
  text: string;

  @ApiProperty()
  author: Author;

  @ApiProperty()
  replyConut: number;
}

class Post {
  @ApiProperty()
  postId: string;

  @ApiProperty()
  text: string;

  @ApiProperty()
  author: Author;

  @ApiProperty()
  replyConut: number;

  @ApiProperty({ type: Reply, isArray: true })
  replyList: Array<Reply>;
}

export class FindByIdPostResponseDto {
  @ApiProperty()
  post: Post;
}
