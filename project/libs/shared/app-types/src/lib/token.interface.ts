export interface IToken {
  id?: string;
  tokenId: string;
  createdAt: Date;
  userId: string;
  expiresIn: Date;
}
