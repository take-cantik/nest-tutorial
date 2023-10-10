import { Reply } from '../value-objects/reply.value-object';

export class ReplyCollection {
  constructor(
    public postId: string,
    private replyList: Reply[],
  ) {
    for (const reply of replyList) {
      if (reply.postId !== postId) {
        throw new Error();
      }
    }
  }

  public all(): Reply[] {
    return this.replyList;
  }

  public count(): number {
    return this.replyList.length;
  }
}
