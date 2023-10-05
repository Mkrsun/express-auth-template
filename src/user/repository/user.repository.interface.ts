import { User } from "../model/user.model";
export interface UserRepoInterface {
  getHashedPasswordByEmail(email: string): Promise<string>;
  create(data: User): Promise<any>;
}
