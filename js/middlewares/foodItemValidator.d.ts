import { Request, Response, NextFunction } from "express";
export declare class FoodItemValidator {
    getFoodItems(req: Request, res: Response, next: NextFunction): void;
    postFoodItem(req: Request, res: Response, next: NextFunction): void;
    updateFoodItem(req: Request, res: Response, next: NextFunction): void;
    deleteFoodItem(req: Request, res: Response, next: NextFunction): void;
}
