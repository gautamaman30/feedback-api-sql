/*
    this file handles the controllers for all the food items related
    actions and interacts with fooditem's services
*/

import {Request, Response } from "express"
import {userService, technologyService, feedbackService, foodItemService} from "../services/index"
import {helperFunctions, Errors} from "../utils/index"
import {logger} from "../configLogger"

export default class FoodItemController{

    //handles get food items requests
    async getFoodItems(req: Request, res: Response) {
        try{
            const user_id: string = req.body.user_id;
            const name: any = req.query.name;
            const sort: any = req.query.sort;

            let foodItems: any = [];

            if(name) {
                const foodItem = await foodItemService.checkFoodItemExist("name", name);
                if(foodItem.error) {
                    throw new Error(foodItem.error);
                }
                foodItems[0] = foodItem;
            } else if(sort) {
                foodItems = await foodItemService.getFoodItemsByQuerySorted({}, sort);
            } else {
                foodItems = await foodItemService.getAllFoodItems();
            }

            if(foodItems.error) {
                throw new Error(foodItems.error);
            }

            foodItems = helperFunctions.removeSensitiveData(foodItems);

            res.status(200);
            res.send({foodItems});
        } catch(e){
            logger.log('error', e.message);
            res.status(400);
            res.send({error: e.message});
        }
    }

    //handles post user feedbacks requests
    async postFoodItem(req: Request, res: Response){
        try{
            const admin_id: string = req.body.user_id;
            const name: string = req.body.name;
            const quantity: number = req.body.quantity;
            const price: number = req.body.price;
            const details: string = req.body.details;

            const admin = await userService.checkUserExist("user_id", admin_id);
            if(admin.error) {
                throw new Error(admin.error);
            }
            if(admin.roles !== "admin"){
                throw new Error(Errors.USER_POST_FOODITEM);
            }

            const foodItem = await foodItemService.checkFoodItemExist("name", name);
            if(foodItem.error === Errors.INTERNAL_ERROR) {
                throw new Error(Errors.INTERNAL_ERROR);
            }
            if(foodItem.name) {
                 throw new Error(Errors.DUPLICATE_FOODITEM);
            }

            let foodItem_info = {name, quantity, price, details};

            const result = await foodItemService.addFoodItem(foodItem_info);
            if(result.error) {
                 throw new Error(result.error);
            }

            res.status(201);
            res.send(result);
        } catch(e){
            logger.log('error', e.message);
            res.status(400);
            res.send({error: e.message});
        }
    }

    //handles update food items requests
    async updateFoodItem(req: Request, res: Response){
        try{
            const admin_id: string = req.body.user_id;
            const name: string = req.body.name;
            const quantity: number = req.body.quantity;
            const price: number = req.body.price;
            const details: string = req.body.details;

            const admin = await userService.checkUserExist("user_id", admin_id);
            if(admin.error) {
                throw new Error(admin.error);
            }
            if(admin.roles !== "admin"){
                throw new Error(Errors.USER_EDIT_FOODITEM);
            }

            if(!(quantity || price || details)){
                throw new Error(Errors.FOODITEM_UPDATE_FIELD_REQUIRED)
            }

            const foodItem = await foodItemService.checkFoodItemExist("name", name);
            if(foodItem.error) {
                throw new Error(foodItem.error);
            }

            const result = await foodItemService.editFoodItem({name, quantity, price, details});
            if(result.error) {
                throw new Error(result.error);
            }

            res.status(200);
            res.send(result);
        } catch(e){
            logger.log('error', e.message);
            res.status(400);
            res.send({error: e.message});
        }
    }

    //handles delete food items requests
    async deleteFoodItem(req: Request, res: Response){
        try{
            const admin_id: string = req.body.user_id;
            const name: string = req.body.name;

            const admin = await userService.checkAdminExist("user_id", admin_id);
            if(admin.error) {
                throw new Error(admin.error);
            }
            if(admin.roles !== "admin"){
                throw new Error(Errors.USER_DELETE_FOODITEM);
            }

            const foodItem = await foodItemService.checkFoodItemExist("name", name);
            if(foodItem.error) {
                throw new Error(foodItem.error);
            }

            const result = await foodItemService.removeFoodItem({name});
            if(result.error) {
                throw new Error(result.error);
            }

            res.status(200);
            res.send(result);
        } catch(e){
            logger.log('error', e.message);
            res.status(400);
            res.send({error: e.message});
        }
    }
}
