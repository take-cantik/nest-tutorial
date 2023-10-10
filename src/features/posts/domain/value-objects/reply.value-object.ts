import { Author } from './author.value-object';

export class Reply {
  constructor(
    public replyId: string,
    public text: string,
    public replyCount: number,
    public postId: string,
    public author: Author,
    public createdAt: string,
    public updatedAt: string,
  ) {}
}
