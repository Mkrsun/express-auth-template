export interface EncryptionServiceInterface {
  hashPassword(plainTextPassword: string): string;
  verifyPassword(myPlainTextPassword: string, hashedPassword: string): boolean;
}
