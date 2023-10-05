import { Request, Response } from "express";
import { AuthControllerInterface } from "./auth.controller.interface";
import { UserRepoInterface } from "../../user/repository/user.repository.interface";
import { User } from "../../user/model/user.model";
import { UserInterface } from "../../user/entity/user.entity.interface";
import { AccessTokenInterface } from "../service/accessTokenService/accessToken.service.interface";
import { EncryptionServiceInterface } from "../service/encryptionService/encryption.service.interface";

export class AuthController implements AuthControllerInterface {
  constructor(
    private readonly encryptionService: EncryptionServiceInterface,
    private readonly accessTokenService: AccessTokenInterface,
    private readonly userRepo: UserRepoInterface
  ) {}

  async signin(req: Request, res: Response): Promise<any> {
    const { email, password: plainTextPassword } = req.body;

    // Validar si los datos requeridos están presentes
    if (!email || !plainTextPassword) {
      return res
        .status(400)
        .json({ error: "Faltan datos necesarios para el registro." });
    }

    const hashedPassword = await this.userRepo.getHashedPasswordByEmail(email);

    const isAuthenticated = this.encryptionService.verifyPassword(
      plainTextPassword,
      hashedPassword
    );

    if (isAuthenticated) {
      const accessToken = this.accessTokenService.createAccessToken({
        email,
      });

      return res.status(200).json({ token: accessToken });
    } else {
      return res
        .status(400)
        .json({ error: "Su correo o contraseña son incorrectos" });
    }
  }
  async signup(req: Request, res: Response): Promise<any> {
    try {
      const { email, password, name } = req.body;

      // Validar si los datos requeridos están presentes
      if (!email || !password || !name) {
        return res
          .status(400)
          .json({ error: "Faltan datos necesarios para el registro." });
      }

      const hashedPassword = this.encryptionService.hashPassword(password);
      const newUser: UserInterface = new User(email, hashedPassword, name);

      // Podrías también querer verificar si el usuario ya existe antes de intentar crear uno nuevo

      const result = await this.userRepo.create(newUser);

      // Envía una respuesta de éxito con el resultado (o un mensaje personalizado)
      return res
        .status(201)
        .json({ message: "Usuario creado exitosamente", result });
    } catch (error) {
      console.error(error);

      // Envía una respuesta de error con un mensaje de error
      return res
        .status(500)
        .json({ error: "Hubo un error al crear el usuario" });
    }
  }

  resetPassword(req: Request, res: Response): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
