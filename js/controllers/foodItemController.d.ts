import { Request, Response } from "express";
export default class FoodItemController {
    getFoodItems(req: Request, res: Response): Promise<void>;
    postFoodItem(req: Request, res: Response): Promise<void>;
    updateFoodItem(req: Request, res: Response): Promise<void>;
    deleteFoodItem(req: Request, res: Response): Promise<void>;
}
