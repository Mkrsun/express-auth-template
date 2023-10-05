import { Request, Response } from "express";
export interface AuthControllerInterface {
  signin(req: Request, res: Response): Promise<any>;
  signup(req: Request, res: Response): Promise<any>;
  resetPassword(req: Request, res: Response): Promise<any>;
}
