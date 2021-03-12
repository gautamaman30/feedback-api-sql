import { Request, Response, NextFunction } from "express";
export default class UserController {
    getUser(req: Request, res: Response): Promise<void>;
    postUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    loginUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteUser(req: Request, res: Response): Promise<void>;
    updateUser(req: Request, res: Response): Promise<void>;
    getUserFoodItems(req: Request, res: Response): Promise<void>;
    postUserFoodItems(req: Request, res: Response): Promise<void>;
    deleteUserFoodItems(req: Request, res: Response): Promise<void>;
}
