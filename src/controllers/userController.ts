/*
    this file handles the controllers for all the user related
    actions and interacts with user's services
*/

import {Request, Response, NextFunction} from "express"
import { userService, foodItemService } from "../services/index"
import { helperFunctions, Errors} from "../utils/index"
import {logger} from "../configLogger"

export default class UserController{

    //handles get user requests
    async getUser(req: Request, res: Response){
        try{
            const user_id: any = req.query.user_id;
            const name: any = req.query.name;
            const email: any = req.query.email;
            let result;
            if(user_id){
                result = await userService.checkUserExist("user_id", user_id);
                if(result.error) throw new Error(result.error);
            }
            else if(email){
                result = await userService.checkUserExist("email", email);
                if(result.error) throw new Error(result.error);
            }
            else if(name){
                result = await userService.getUsers("name", name);
                if(result.error) throw new Error(result.error);
            }
            else{
                result = await userService.getAllUsers();
                if(result.error) throw new Error(result.error);
            }
            result = helperFunctions.removeSensitiveData(result);

            res.status(200);
            res.send(result);
        } catch(e){
            logger.log('error', e.message);
            res.status(404);
            res.send({error: e.message});
        }
    }

    //handles post user requests
    async postUser(req: Request, res: Response, next: NextFunction){
        try{
            const admin_id: string = req.body.user_id;
            let name: string = req.body.name;
            let email: string = req.body.email;
            let title: string = req.body.title;
            let date_of_birth: Date = req.body.date_of_birth;

            const admin: any = await userService.checkAdminExist("user_id", admin_id);
            if(admin.error) {
                throw new Error(admin.error);
            }

            const user: any = await userService.checkUserExist("email", email);
            if(user.error === Errors.INTERNAL_ERROR) {
                throw new Error(Errors.INTERNAL_ERROR);
            }
            if(user.user_id) {
                throw new Error(Errors.DUPLICATE_EMAIL);
            }

            let user_info: any = {name, email, title, date_of_birth};

            let result = await userService.addUser(user_info);
            if(result.error) {
                throw new Error(result.error);
            }

            const payload: string = JSON.stringify({
                user_id: result.user_id,
                name: result.name,
                email: result.email
            });

            res.set("payload", payload);
            res.status(201);
            return next();
        } catch(e){
            logger.log('error', e.message);
            res.status(400);
            res.send({error: e.message});
        }
    }

    //handles user login requests
    async loginUser(req: Request, res: Response, next: NextFunction){
        try{
            let email: string = req.body.email;
            let password: string = req.body.password;

            const user: any = await userService.checkUserExist("email", email);
            if(user.error) {
                throw new Error(user.error);
            }

            const result: any = await helperFunctions.comparePassword(password, user.password);
            if(result.error){
                throw new Error(result.error);
            }
            if(!result){
                throw new Error(Errors.USER_PASSWORD_INCORRECT);
            }

            const payload: string = JSON.stringify({
                user_id: user.user_id,
                name: user.name,
                email: user.email
            });

            res.setHeader("payload", payload);
            res.status(200);
            return next();
        } catch(e){
            logger.log('error', e.message);
            res.status(400);
            res.send({error: e.message});
        }
    }

    //handles delete user requests
    async deleteUser(req: Request, res: Response){
        try{
            const admin_id: string = req.body.user_id;
            const email: string = req.body.email;

            const admin: any = await userService.checkAdminExist("user_id", admin_id);
            if(admin.error) {
                throw new Error(admin.error);
            }

            const user: any = await userService.checkUserExist("email", email);
            if(user.error) {
                throw new Error(user.error);
            }
            if(user.roles === "admin") {
                throw new Error(Errors.ADMIN_DELETE_ADMIN);
            }

            const result: any = await userService.removeUser({email});
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

    //handles update user requests
    async updateUser(req: Request, res: Response){
        try{
            const user_id: string = req.body.user_id;
            let password: string = req.body.password;
            let title: string = req.body.title;
            let date_of_birth: Date = req.body.date_of_birth;


            const user: any = await userService.checkUserExist("user_id", user_id);
            if(user.error) {
                throw new Error(user.error);
            }
            if(user.roles === "admin") {
                throw new Error(Errors.ADMIN_EDIT_USER);
            }
            if(!(password || title || date_of_birth)){
                throw new Error(Errors.USER_UPDATE_FIELD_REQUIRED)
            }

            let user_info: any = {email: user.email, password, title, date_of_birth};

            let result = await userService.editUser(user_info);
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

    //handles get requests for food items consumed by user
    async getUserFoodItems(req: Request, res: Response) {
        try {
            const user_id: string = req.body.user_id;
            let name: any = req.query.name;
            let email: any = req.query.email;
            let sort: any = req.query.sort;

            const user: any = await userService.checkUserExist("user_id", user_id);
            if(user.error) {
                throw new Error(user.error);
            }
            let result;
            if(user.roles !== "admin") {
                if(name) {
                    result = await userService.getConsumptionDetails({food_name: name, email: user.email});
                } else if(sort) {
                    result = await userService.getConsumptionDetailsSorted({email: user.email}, sort);
                } else {
                    result = await userService.getConsumptionDetails({email: user.email})
                }
            } else {
                if(sort) {
                    if(name) {
                        result = await userService.getConsumptionDetailsSorted({food_name: name}, sort);
                    } else if(email) {
                        result = await userService.getConsumptionDetailsSorted({email}, sort);
                    } else {
                        result = await userService.getConsumptionDetailsSorted({}, sort)
                    }
                } else {
                    if(name && email) {
                        result = await userService.getConsumptionDetails({food_name: name, email: email});
                    } else if(name) {
                        result = await userService.getConsumptionDetails({food_name: name});
                    } else if(email) {
                        result = await userService.getConsumptionDetails({email});
                    } else {
                    result = await userService.getConsumptionDetails({})
                    }
                }
            }

            if(result.error) {
                throw new Error(result.error);
            }

            result = helperFunctions.removeSensitiveData(result);

            res.status(200);
            res.send({result})
        } catch(e) {
            logger.log('error', e.message);
            res.status(400);
            res.send({error: e.message});
        }
    }

    //handles post requests for food items consumed by user
    async postUserFoodItems(req: Request, res: Response) {
        try {
            const user_id: string = req.body.user_id;
            let name: string = req.body.name;
            let quantity: number = req.body.quantity;

            const user: any = await userService.checkUserExist("user_id", user_id);
            if(user.error) {
                throw new Error(user.error);
            }
            if(user.roles === "admin") {
                throw new Error(Errors.ADMIN_CONSUME_FOOD);
            }

            let foodItem = await foodItemService.checkFoodItemExist("name", name);
            if(foodItem.error) {
                throw new Error(foodItem.error);
            }
            if(foodItem.quantity < quantity){
                throw new Error(Errors.FOODITEM_QUANTITY_NOT_AVAILABLE);
            }

            let amount_due: number = Math.floor((quantity * foodItem.price)*100)/100;
            let user_food_info: any = {food_name: name, email: user.email, quantity, amount_due};

            const result = await userService.addUserFoodItem(user_food_info);
            if(result.error) {
                throw new Error(result.error);
            }

            quantity = foodItem.quantity - quantity;
            const foodItem_result = await foodItemService.editFoodItem({name, quantity})
            if(foodItem_result.error) {
                logger.log('error', foodItem_result.error);
            }

            res.status(201);
            res.send(result);
        } catch(e) {
            logger.log('error', e.message);
            res.status(400);
            res.send({error: e.message});
        }
    }

    //handles delete requests for food items consumed by user
    async deleteUserFoodItems(req: Request, res: Response) {
        try {
            const admin_id: string = req.body.user_id;
            const name: string = req.body.name;
            const email: string = req.body.email;

            const admin: any = await userService.checkAdminExist("user_id", admin_id);
            if(admin.error) {
                throw new Error(admin.error);
            }

            let result = await userService.removeUserFoodItem({food_name: name, email});
            if(result.error) {
                throw new Error(result.error);
            }

            res.status(200);
            res.send(result);
        } catch(e) {
            logger.log('error', e.message);
            res.status(400);
            res.send({error: e.message});
        }
    }
}
