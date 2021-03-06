import { Request, Response, NextFunction } from "express";
export declare class AuthMiddleware {
    signToken(req: Request, res: Response, next: NextFunction): void;
    verifyToken(req: Request, res: Response, next: NextFunction): void;
    checkRequestKeys(req: Request, res: Response, next: NextFunction): void;
    handleInvalidRoutes(req: Request, res: any, Response: any): void;
}
