import { Request, Response, NextFunction } from "express";
export declare class UserValidator {
    deleteUser(req: Request, res: Response, next: NextFunction): void;
    loginUser(req: Request, res: Response, next: NextFunction): void;
    postUser(req: Request, res: Response, next: NextFunction): void;
    updateUser(req: Request, res: Response, next: NextFunction): void;
    getUserFoodItems(req: Request, res: Response, next: NextFunction): void;
    getUserAmountDue(req: Request, res: Response, next: NextFunction): void;
    postUserFoodItems(req: Request, res: Response, next: NextFunction): void;
    deleteUserFoodItems(req: Request, res: Response, next: NextFunction): void;
}
