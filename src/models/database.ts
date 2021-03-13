/*
    this file interacts with database using typeorm library
    ( postgresql as database)
    and performs queries
*/

import { getRepository } from "typeorm"
import { Users } from "./user"
import { Technology } from "./technology"
import { Feedback } from "./feedback"
import { FoodItem } from "./foodItem"
import { Consumption } from "./consumption"

import {logger} from "../configLogger"

export class Database{

    //finds first user matching the given query
    async findUser(query){
        try{
            const result = await getRepository(Users)
                .findOne(query);
            return result;
        } catch(e){
            logger.log('error', e.message);
            return {error: e.message};
        }
    }

    //finds all users matching the given query
    async findUsers(query){
        try{
            const result = await getRepository(Users)
                .find(query);
            return result;
        } catch(e){
            logger.log('error', e.message);
            return {error: e.message};
        }
    }

    //finds users consumed food items matching the given query
    async findUserFoodItem(query){
        try{
            const result = await getRepository(Consumption)
                .find(query);
            return result;
        } catch(e){
            logger.log('error', e.message);
            return {error: e.message};
        }
    }

    //finds users consumed food items matching the given query sorted
    async findUserFoodItemSorted(query, sortField){
        try{
            let result;

            if(Object.keys(query).length === 0) {
                result = await getRepository(Consumption)
                    .createQueryBuilder("consumption")
                    .orderBy(`consumption.${sortField}`,"DESC")
                    .getMany();
            }
            else {
                const key: string = Object.keys(query)[0];

                result = await getRepository(Consumption)
                    .createQueryBuilder("consumption")
                    .where(`consumption.${key} = :${key}`, query)
                    .orderBy(`consumption.${sortField}`,"DESC")
                    .getMany();
            }
            return result;
        } catch(e){
            logger.log('error', e.message);
            return {error: e.message};
        }
    }

    //finds all technologies matching the given query
    async findTechnologies(query){
        try{
            const result = await getRepository(Technology)
                .find(query);
            return result;
        } catch(e){
            logger.log('error', e.message);
            return {error: e.message};
        }
    }

    //finds first technology matching the given query
    async findTechnology(query){
        try{
            const result = await getRepository(Technology)
                .findOne(query);
            return result;
        } catch(e){
            logger.log('error', e.message);
            return {error: e.message};
        }
    }

    //finds first feedback matching the given query
    async findFeedback(query){
        try{
            const result = await getRepository(Feedback)
                .findOne(query);
            return result;
        } catch(e){
            logger.log('error', e.message);
            return {error: e.message};
        }
    }

    //finds all feedbacks matching the given query
    async findFeedbacks(query){
        try{
            const result = await getRepository(Feedback)
                .find(query);
            return result;
        } catch(e){
            logger.log('error', e.message);
            return {error: e.message};
        }
    }

    //finds all feedbacks matching the given query in descending order
    async findFeedbacksSorted(query, sortField) {
        try{
            let result;

            if(Object.keys(query).length === 0) {
                result = await getRepository(Feedback)
                    .createQueryBuilder("feedback")
                    .orderBy(`feedback.${sortField}`,"DESC")
                    .getMany();
            }
            else {
                const key: string = Object.keys(query)[0];

                result = await getRepository(Feedback)
                    .createQueryBuilder("feedback")
                    .where(`feedback.${key} = :${key}`, query)
                    .orderBy(`feedback.${sortField}`,"DESC")
                    .getMany();
            }
            return result;
        } catch(e){
            logger.log('error', e.message);
            return {error: e.message};
        }
    }

    //finds first food item matching the given query
    async findFoodItem(query){
        try{
            const result = await getRepository(FoodItem)
                .findOne(query);
            return result;
        } catch(e){
            logger.log('error', e.message);
            return {error: e.message};
        }
    }

    //finds all food items matching the given query
    async findFoodItems(query){
        try{
            const result = await getRepository(FoodItem)
                .find(query);
            return result;
        } catch(e){
            logger.log('error', e.message);
            return {error: e.message};
        }
    }

    //finds all food items matching the given query in descending order
    async findFoodItemsSorted(query, sortField) {
        try{
            let result;

            if(Object.keys(query).length === 0) {
                result = await getRepository(FoodItem)
                    .createQueryBuilder("food_item")
                    .orderBy(`food_item.${sortField}`,"DESC")
                    .getMany();
            }
            else {
                const key: string = Object.keys(query)[0];

                result = await getRepository(FoodItem)
                    .createQueryBuilder("food_item")
                    .where(`food_item.${key} = :${key}`, query)
                    .orderBy(`food_item.${sortField}`,"DESC")
                    .getMany();
            }
            return result;
        } catch(e){
            logger.log('error', e.message);
            return {error: e.message};
        }
    }

    //finds total amount due by food item
    async findTotalAmountDueByFoodItem(query) {
        try {
            const result = await getRepository(Consumption)
                .createQueryBuilder("consumption")
                .select("consumption.food_name", "food_name")
                .addSelect("SUM(consumption.amount_due)", "amount_due")
                .where("consumption.food_name = :food_name", {food_name: query.food_name})
                .groupBy("consumption.food_name")
                .getRawOne();
            if(!result) {
                return {};
            }
            return result;
        } catch(e) {
            logger.log('error', e.message);
            return {error: e.message};
        }
    }

    //finds total amount due for a user by food item
    async findTotalAmountDueByUserAndFoodItem(query) {
        try {
            const result = await getRepository(Consumption)
                .createQueryBuilder("consumption")
                .select("consumption.food_name", "food_name")
                .addSelect("consumption.email", "email")
                .addSelect("SUM(consumption.amount_due)", "amount_due")
                .where("consumption.food_name = :food_name", {food_name: query.food_name})
                .andWhere("consumption.email = :email", {email: query.email})
                .groupBy("consumption.food_name")
                .addGroupBy("consumption.email")
                .getRawOne();

            if(!result) {
                return {};
            }
            return result;
        } catch(e) {
            logger.log('error', e.message);
            return {error: e.message};
        }
    }

    //finds total amount due for a user for all food items
    async findTotalAmountDue(query) {
        try {
            const result = await getRepository(Consumption)
                .createQueryBuilder("consumption")
                .select("consumption.email", "email")
                .addSelect("SUM(consumption.amount_due)", "amount_due")
                .where("consumption.email = :email", {email: query.email})
                .groupBy("consumption.email")
                .getRawOne();

            if(!result) {
                return {};
            }
            return result;
        } catch(e) {
            logger.log('error', e.message);
            return {error: e.message};
        }
    }

    //finds total amount due for all users
    async findTotalAmountDueForAllUsers() {
        try {
            const result = await getRepository(Consumption)
                .createQueryBuilder("consumption")
                .select("consumption.email", "email")
                .addSelect("SUM(consumption.amount_due)", "amount_due")
                .groupBy("consumption.email")
                .getRawMany();

            if(!result) {
                return {};
            }
            return result;
        } catch(e) {
            logger.log('error', e.message);
            return {error: e.message};
        }
    }

    //updates all users matching the given filter
    async updateUser(filter, update) {
        try{
            const result = await getRepository(Users)
                .update(filter, update);
            return result;
        } catch(e){
            logger.log('error', e.message);
            return {error: e.message};
        }
    }

    //updates all technologies matching the given filter
    async updateTechnology(filter, update){
        try{
            const result = await getRepository(Technology)
                .update(filter, update);
            return result;
        } catch(e){
            logger.log('error', e.message);
            return {error: e.message};
        }
    }

    //updates all feedbacks matching the given filter
    async updateFeedback(filter, update){
        try{
            const result = await getRepository(Feedback)
                .update(filter, update);
            return result;
        } catch(e){
            logger.log('error', e.message);
            return {error: e.message};
        }
    }

    //updates feedback count matching the given filter
    async updateFeedbackCount(filter, update){
        try{
            const result = await getRepository(Feedback)
                .createQueryBuilder("feedback")
                .update(Feedback)
                .set({count: () => "count + 1"})
                .where("feedback_id = :feedback_id",filter)
                .execute();
            return result;
        } catch(e){
            logger.log('error', e.message);
            return {error: e.message};
        }
    }

    //updates all food item matching the given filter
    async updateFoodItem(filter, update){
        try{
            const result = await getRepository(FoodItem)
                .update(filter, update);
            return result;
        } catch(e){
            logger.log('error', e.message);
            return {error: e.message};
        }
    }

    //inserts new user with given user information
    async insertUser(user_info){
        try{
            const result = await getRepository(Users)
                .insert(user_info);
            return result;
        } catch(e){
            logger.log('error', e.message);
            return {error: e.message};
        }
    }

    //inserts food item consumed by user with given user information
    async insertUserFoodItem(user_foodItem_info){
        try{
            const result = await getRepository(Consumption)
                .insert(user_foodItem_info);
            return result;
        } catch(e){
            logger.log('error', e.message);
            return {error: e.message};
        }
    }

    //inserts new technology with given technology information
    async insertTechnology(technology_info){
        try{
            const result = await getRepository(Technology)
                .insert(technology_info);
            return result;
        } catch(e){
            logger.log('error', e.message);
            return {error: e.message};
        }
    }

    //inserts new feedback with given feedback information
    async insertFeedback(feedback_info){
        try{
            const result = await getRepository(Feedback)
                .insert(feedback_info);
            return result;
        } catch(e){
            logger.log('error', e.message);
            return {error: e.message};
        }
    }

    //inserts new food item with given information
    async insertFoodItem(foodItem_info){
        try{
            const result = await getRepository(FoodItem)
                .insert(foodItem_info);
            return result;
        } catch(e){
            logger.log('error', e.message);
            return {error: e.message};
        }
    }

    //deletes user matching the given query
    async deleteUser(query){
        try{
            const result = await getRepository(Users)
                .delete(query);
            return result;
        } catch(e){
            logger.log('error', e.message);
            return {error: e.message};
        }
    }

    //deletes food item consumed by user matching the given query
    async deleteUserFoodItem(query){
        try{
            const result = await getRepository(Consumption)
                .delete(query)
            return result;
        } catch(e){
            logger.log('error', e.message);
            return {error: e.message};
        }
    }

    //deletes technology matching the given query
    async deleteTechnology(query){
        try{
            const result = await getRepository(Technology)
                .delete(query);
            return result;
        } catch(e){
            logger.log('error', e.message);
            return {error: e.message};
        }
    }

    //deletes feedback matching the given query
    async deleteFeedback(query){
        try{
            const result = await getRepository(Feedback)
                .delete(query);
            return result;
        } catch(e){
            logger.log('error', e.message);
            return {error: e.message};
        }
    }

    //deletes food items matching the given query
    async deleteFoodItem(query){
        try{
            const result = await getRepository(FoodItem)
                .delete(query);
            return result;
        } catch(e){
            logger.log('error', e.message);
            return {error: e.message};
        }
    }
}
