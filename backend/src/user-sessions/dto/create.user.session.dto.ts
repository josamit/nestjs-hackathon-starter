export class CreateUserSessionDto {
  userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }
}
