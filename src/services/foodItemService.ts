/*
    this file handles the services for all the food items related
    actions and interacts with database
*/

import { database } from '../models/index'
import {Errors, Messages, helperFunctions } from '../utils/index'
import {logger} from "../configLogger"

export default class FeedbackService{

    //get all the food items
    async getAllFoodItems(){
        try{
            const result = await database.findFoodItems({});
            if(!Array.isArray(result) && result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }
            return result;
        } catch(err) {
            logger.log('error', err.message);
            return {error: Errors.INTERNAL_ERROR};
        }
    }

    //get all food items with given query and sorted
    async getFoodItemsByQuerySorted(query, sort?){
        try{
            if(sort) {
                let result = await database.findFoodItemsSorted(query, sort);
                if(!Array.isArray(result) && result.error){
                    throw new Error(Errors.INTERNAL_ERROR);
                }
                return result;
            }
            let result = await database.findFoodItems(query);

            if(!Array.isArray(result) && result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }
            return result;
        } catch(err) {
            logger.log('error', err.message);
            return {error: Errors.INTERNAL_ERROR};
        }
    }

    //updates food items
    async editFoodItem(foodItem_info: {name: string, quantity?: number, price?: number, details?: string}){
        try{
            let foodItem: any = {};
            if(foodItem_info.quantity) foodItem.quantity = foodItem_info.quantity;
            if(foodItem_info.price) foodItem.price = foodItem_info.price;
            if(foodItem_info.details) foodItem.details = foodItem_info.details;

            const result: any = await database.updateFoodItem({ name: foodItem_info.name },  foodItem);
            if(result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }
            if(result.affected < 1){
                throw new Error(Errors.FOODITEM_NOT_FOUND);
            }
            return {message: Messages.FOODITEM_UPDATED};
        } catch(err) {
            logger.log('error', err.message);
            return {error: err.message};
        }
    }

    //deletes the food item matching the given name
    async removeFoodItem(foodItem_info: {name: string}){
        try{
            const result: any = await database.deleteFoodItem({ name: foodItem_info.name });

            if(result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }
            if(result.affected !== 1){
                throw new Error(Errors.FOODITEM_NOT_FOUND);
            }
            return {message: Messages.FOODITEM_REMOVED};
        } catch(err) {
            logger.log('error', err.message);
            return {error: err.message};
        }
    }

    //finds if the food item exists given the key and value
    async checkFoodItemExist(key: string, value: any){
        try{
            let foodItem_info = {};
            foodItem_info[key] = value;

            const result: any = await database.findFoodItem(foodItem_info);
            if(!result){
                throw new Error(Errors.FOODITEM_NOT_FOUND);
            }
            if(result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }
            return result;
        } catch(err) {
            logger.log('error', err.message);
            return {error: err.message};
        }
    }

    //creates a new food item with all the given food item information
    async addFoodItem(foodItem_info: {name: string, quantity: number, price: number, details?: string}){
        try{
            let foodItem: any;

            foodItem = {
                name: foodItem_info.name,
                quantity: foodItem_info.quantity,
                price: foodItem_info.price
            }

            if(foodItem_info) foodItem.details = foodItem_info.details;

            const result: any = await database.insertFoodItem(foodItem);
            if(result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }

            return {message: Messages.FOODITEM_CREATED};
        } catch(err) {
            logger.log('error', err.message);
            return {error: err.message};
        }
    }
}
