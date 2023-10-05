import { Router } from "express";
import { AuthController } from "./controller/auth.controller";
import { BcryptEncryptionService } from "./service/encryptionService/bcryptEncryption.service";
import { UserMysqlRepository } from "../user/repository/user.mysql.repository";
import { Mysql2Repository } from "../db/mysql2/mysql2.repository";
import { AccessTokenJWT } from "./service/accessTokenService/accessTokenJWT.service";

const authRoutes = Router();
const dbRepository = new Mysql2Repository();
const userRepo = new UserMysqlRepository(dbRepository);
const encryptionService = new BcryptEncryptionService();
const accessTokenServiec = new AccessTokenJWT();
const authController = new AuthController(
  encryptionService,
  accessTokenServiec,
  userRepo
);

authRoutes.post("/signin", authController.signin.bind(authController));
authRoutes.post("/signup", authController.signup.bind(authController));

export { authRoutes };
