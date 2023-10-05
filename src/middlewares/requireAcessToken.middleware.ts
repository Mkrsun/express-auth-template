import { Request, Response, NextFunction } from "express";
import { AccessTokenJWT } from "../auth/service/accessTokenService/accessTokenJWT.service";
import { AccessTokenInterface } from "../auth/service/accessTokenService/accessToken.service.interface";
const requireAcessTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string = req.headers?.authorization as string;
  if (token) {
    try {
      const accessToken: AccessTokenInterface = new AccessTokenJWT();
      if (accessToken.verifyAccessToken(token)) {
        return next();
      }
    } catch (error) {
      console.error(error);
      return res.sendStatus(403);
    }
  } else {
    return res.sendStatus(401);
  }
};

export { requireAcessTokenMiddleware };
