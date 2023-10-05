import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AccessTokenInterface } from "./accessToken.service.interface";

dotenv.config();

export class AccessTokenJWT implements AccessTokenInterface {
  createAccessToken(valueObj: any, expirationTime?: string): string {
    return jwt.sign(valueObj, process.env.JWT_SECRET!, {
      expiresIn: expirationTime ?? "1h",
    });
  }
  verifyAccessToken(token: string): boolean {
    try {
      const result = jwt.verify(token, process.env.JWT_SECRET!);
      return true;
    } catch (err) {
      return false;
    }
  }
}
