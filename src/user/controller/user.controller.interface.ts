import { Request, Response } from "express"
export interface UserControllerInterface {
  update(req: Request, res: Response): Promise<any>;
  delete(req: Request, res: Response): Promise<any>;
}