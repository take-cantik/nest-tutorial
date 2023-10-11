export class AuthUser {
  constructor(
    public userId: string,
    public publicId: string,
    public hashedPassword: string,
    public createdAt: string,
    public updatedAt: string,
  ) {}
}
