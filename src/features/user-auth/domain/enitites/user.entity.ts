export class User {
  constructor(
    public userId: string,
    public publicId: string,
    public username: string,
    public hashedPassword: string,
    public createdAt: string,
    public updatedAt: string,
  ) {}
}
