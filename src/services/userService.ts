/*
    this file handles the services for all the user related
    actions and interacts with database
*/

import { database } from '../models/index'
import {Errors, Messages, helperFunctions } from '../utils/index'
import {logger} from "../configLogger"

export default class UserService{

    //get all users
    async getAllUsers(){
        try{
            let result = await database.findUsers({});
            if(!Array.isArray(result) && result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }

            return result;
        } catch(err) {
            logger.log('error', err.message);
            return {error: Errors.INTERNAL_ERROR};
        }
    }

    //get all users with given key and value query
    async getUsers(key: string, value: any){

        try{
            let user_info: any = {};
            user_info[key] = value;

            const result = await database.findUsers(user_info);

            if(!result){
                throw new Error(Errors.USER_NOT_FOUND);
            }
            if(!Array.isArray(result) && result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }

            return result;
        } catch(err) {
            logger.log('error', err.message);
            return {error: err.message};
        }

    }

    //removes user matching the given user email
    async removeUser(user_info: {email: string}){
        try{
            const result: any = await database.deleteUser({ email: user_info.email });

            if(result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }
            if(result.affected !== 1){
                throw new Error(Errors.USER_NOT_FOUND);
            }
            return {message: Messages.USER_DELETED};
        } catch(err) {
            logger.log('error', err.message);
            return {error: err.message};
        }
    }

    //finds if a user exists with the given key and value
    async checkUserExist(key: string, value: any){

        try{
            let user_info: any = {};
            user_info[key] = value;

            const result: any = await database.findUser(user_info);

            if(!result){
                throw new Error(Errors.USER_NOT_FOUND);
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

    //finds if the admin exists with the given key and value
    async checkAdminExist(key: string, value: any){

        try{
            let user_info: any = {};
            user_info[key] = value;

            const result: any = await database.findUser(user_info);

            if(!result){
                throw new Error(Errors.ADMIN_NOT_FOUND);
            }
            if(result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }
            if(result.roles !== "admin"){
                throw new Error(Errors.NOT_ADMIN);
            }

            return result;
        } catch(err) {
            logger.log('error', err.message);
            return {error: err.message};
        }
    }

    //adds a new user to the database given all the details about the user
    async addUser(user_info: {name: string, email: string, title?: string, date_of_birth?: string}){

        try{
            let user: any = {};
            let password: string = user_info.name + '1234';
            let hashedPassword = await helperFunctions.hashPassword(password);

            user = {
                user_id: helperFunctions.generateId(),
                name: user_info.name,
                email: user_info.email,
                password: hashedPassword,
                roles: "employee"
            }

            if(user_info.title) user.title = user_info.title;
            if(user_info.date_of_birth) {
                let temp_date_of_birth: Date | null = helperFunctions.convertStringToDate(user_info.date_of_birth);4
                if(!temp_date_of_birth){
                    throw new Error(Errors.INVALID_DATE);
                }
                user.date_of_birth = helperFunctions.getFormatedDate(temp_date_of_birth);
            }
            const result: any = await database.insertUser(user);

            if(result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }
            user.password = password;
            return user;
        } catch(err) {
            logger.log('error', err.message);
            return {error: err.message};
        }
    }

    //updates user's password, title and date of birth
    async editUser(user_info: {email: string, password?: string, title?: string, date_of_birth?: string}){

        try{
            let update: any = {};
            if(user_info.password){
                update.password = await helperFunctions.hashPassword(user_info.password);
            }
            if(user_info.title){
                update.title = user_info.title
            }
            if(user_info.date_of_birth) {
                let temp_date_of_birth: Date | null = helperFunctions.convertStringToDate(user_info.date_of_birth);4
                if(!temp_date_of_birth){
                    throw new Error(Errors.INVALID_DATE);
                }
                update.date_of_birth = helperFunctions.getFormatedDate(temp_date_of_birth);
            }

            let filter = {email: user_info.email};
            const result: any = await database.updateUser(filter, update);

            if(result.error || result.affected < 1){
                throw new Error(Errors.INTERNAL_ERROR);
            }

            return {message: Messages.USER_UPDATED};
        } catch(err) {
            logger.log('error', err.message);
            return {error: err.message};
        }
    }

    //get consumed food item details
    async getConsumptionDetails(query){
        try{
            const result: any = await database.findUserFoodItem(query);
            if(result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }
            return result;
        } catch(err) {
            logger.log('error', err.message);
            return {error: err.message};
        }
    }

    //get consumed food item details sorted
    async getConsumptionDetailsSorted(query, sort){
        try{
            if(sort === "date") {
                sort = "consumed_on";
            }
            if(sort === "due") {
                sort = "amount_due";
            }
            const result: any = await database.findUserFoodItemSorted(query, sort);
            if(result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }
            return result;
        } catch(err) {
            logger.log('error', err.message);
            return {error: err.message};
        }
    }

    //adds a new consumed food item by user
    async addUserFoodItem(user_food_info: {food_name: string, email: string, quantity: number, amount_due: number}){
        try{
            const result: any = await database.insertUserFoodItem(user_food_info);
            if(result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }
            return {message: Messages.USER_FOOD_CREATED};
        } catch(err) {
            logger.log('error', err.message);
            return {error: err.message};
        }
    }

    //deletes the consumed food item by user
    async removeUserFoodItem(user_food_info: {food_name: string, email: string}){
        try{
            const result: any = await database.deleteUserFoodItem(user_food_info);
            if(result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }
            return {message: Messages.USER_FOOD_DELETED};
        } catch(err) {
            logger.log('error', err.message);
            return {error: err.message};
        }
    }
}
