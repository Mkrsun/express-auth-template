import { EncryptionServiceInterface } from "./encryption.service.interface";
import bcrypt from "bcrypt";
export class BcryptEncryptionService implements EncryptionServiceInterface {
  hashPassword(plainTextPassword: string): string {
    const saltRounds = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(plainTextPassword, saltRounds);
    return hashedPassword;
  }
  verifyPassword(plainTextPassword: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(plainTextPassword, hashedPassword);
  }
}
