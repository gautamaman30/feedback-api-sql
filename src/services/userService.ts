/*
    this file handles the services for all the user related
    actions and interacts with database
*/

import { database } from '../models/index'
import {Errors, Messages, helperFunctions } from '../utils/index'

export default class UserService{

    //get all users
    async getAllUsers(){
        try{
            let result: any = await database.findUsers({});
            if(result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }

            return result;
        } catch(err) {
            console.log(err);
            return {error: Errors.INTERNAL_ERROR};
        }
    }

    //get all users with given key and value query
    async getUsers(key: string, value: any){

        try{
            let user_info: any = {};
            user_info[key] = value;

            const result: any = await database.findUsers(user_info);

            if(!result){
                throw new Error(Errors.USER_NOT_FOUND);
            }
            if(result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }

            return result;
        } catch(err) {
            console.log(err);
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
            if(result.deletedCount !== 1){
                throw new Error(Errors.USER_NOT_FOUND);
            }
            return {message: Messages.USER_DELETED};
        } catch(err) {
            console.log(err);
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
            console.log(err);
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
            console.log(err);
            return {error: err.message};
        }
    }

    //adds a new user to the database given all the details about the user
    async addUser(user_info: {name: string, email: string, title?: string, date_of_birth?: string}){

        try{
            let user: any;
            let password: string = helperFunctions.generateRandomPassword();
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
                let temp_date_of_birth: any = helperFunctions.convertStringToDate(user_info.date_of_birth);4
                if(!temp_date_of_birth){
                    throw new Error(Errors.INVALID_DATE);
                }
                user.date_of_birth = helperFunctions.getFormatedDate(temp_date_of_birth);
            }
            const result: any = await database.insertUser(user);

            if(result.error || result.insertedCount < 1){
                throw new Error(Errors.INTERNAL_ERROR);
            }
            user.password = password;
            return user;
        } catch(err) {
            console.log(err);
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
                let temp_date_of_birth: any = helperFunctions.convertStringToDate(user_info.date_of_birth);4
                if(!temp_date_of_birth){
                    throw new Error(Errors.INVALID_DATE);
                    update.date_of_birth = helperFunctions.getFormatedDate(temp_date_of_birth);
                }
            }

            let filter = {email: user_info.email};
            const result: any = await database.updateUser(filter, update);

            if(result.error || result.insertedCount < 1){
                throw new Error(Errors.INTERNAL_ERROR);
            }

            return {message: Messages.USER_UPDATED};
        } catch(err) {
            console.log(err);
            return {error: err.message};
        }

    }

}
