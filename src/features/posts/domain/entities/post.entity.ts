import { Author } from '../value-objects/author.value-object';
import { ReplyCollection } from './reply-collection.entity';

export class Post {
  constructor(
    public postId: string,
    public text: string,
    public createdAt: string,
    public updatedAt: string,
    public author: Author,
    public replyCollection: ReplyCollection,
  ) {}

  public isAuthor(userId: string): boolean {
    return this.author.authorId === userId;
  }
}
