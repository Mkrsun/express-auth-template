export interface AccessTokenInterface {
  createAccessToken(valueObj: any): string;
  verifyAccessToken(token: string): boolean;
}
