import { UserInterface } from "../entity/user.entity.interface";
export class User implements UserInterface {
  email: string;
  hashedPassword: string;
  name: string;
  constructor(email: string, hashedPassword: string, name: string) {
    this.email = email;
    this.name = name;
    this.hashedPassword = hashedPassword;
  }
}
