/*
    this file handles the validation for all
    user related requests,
    using yup library
*/

import {Request, Response, NextFunction} from "express"
import { helperFunctions } from "../utils/index"
import {object, string, number} from "yup"
import {logger} from "../configLogger"

export class UserValidator{

    //validates delete user requests
    deleteUser(req: Request, res: Response, next: NextFunction){
        let user_schema = object({
            email: string().email().required().trim().max(100)
        });

        let user_info = {
            email: req.body.email
        };

        user_schema.validate(user_info)
            .then((result) => {
              req.body.email = result.email;
              return next();
            }).catch(err => {
                logger.log('error', err.message);
                res.status(400);
                let error = helperFunctions.capitalizeString(err.errors);
                res.send({error});
            })
    }

    //validates user login requests
    loginUser(req: Request, res: Response, next: NextFunction){
        let user_schema = object({
            email: string().email().required().trim().max(100),
            password: string().required().trim().min(8).max(100)
        });

        let user_info = {
            email: req.body.email,
            password: req.body.password
        };

        user_schema.validate(user_info)
            .then((result) => {
              req.body.email = result.email;
              req.body.password = result.password;
              return next();
            }).catch(err => {
                logger.log('error', err.message);
                res.status(400);
                let error = helperFunctions.capitalizeString(err.errors);
                res.send({error});
            })
    }

    //validates post user requests
    postUser(req: Request, res: Response, next: NextFunction){
        let user_schema = object({
            name: string().required().lowercase().trim().min(3).max(50).matches(/^[a-z]+$/),
            email: string().email().required().trim().max(100),
            title: string().trim().uppercase().min(3).max(100),
            date_of_birth: string().trim().length(10).matches(/^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/, "Date of birth must match with format mm/dd/yyyy")
        });

        let user_info = {
            name: req.body.name,
            email: req.body.email,
            title: req.body.title,
            date_of_birth: req.body.date_of_birth
        };

        user_schema.validate(user_info)
            .then((result) => {
              req.body.email = result.email;
              req.body.name = result.name;
              req.body.title = result.title;
              req.body.date_of_birth = result.date_of_birth;

              return next();
            }).catch(err => {
                logger.log('error', err.message);
                res.status(400);
                let error = helperFunctions.capitalizeString(err.errors);
                res.send({error});
            })
    }

    //validates update user requests
    updateUser(req: Request, res: Response, next: NextFunction){
        let user_schema = object({
            password: string().trim().min(8).max(100).matches(/^[a-zA-Z0-9!@#$%&*]+$/),
            title: string().trim().uppercase().min(3).max(100),
            date_of_birth: string().trim().length(10).matches(/^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/, "Date of birth must match with format mm/dd/yyyy")
        });

        let user_info = {
            password: req.body.password,
            title: req.body.title,
            date_of_birth: req.body.date_of_birth
        };

        user_schema.validate(user_info)
            .then((result) => {
                req.body.password = result.password;
                req.body.title = result.title;
                req.body.date_of_birth = result.date_of_birth;

                return next();
            }).catch(err => {
                logger.log('error', err.message);
                res.status(400);
                let error = helperFunctions.capitalizeString(err.errors);
                res.send({error});
            })
    }

    //validates get user consumed food items requests
    getUserFoodItems(req: Request, res: Response, next: NextFunction) {
        let user_consumption_schema = object({
            name: string().lowercase().trim().min(3).max(100).matches(/^[a-z]+$/),
            email: string().email().trim().max(100),
            sort: string().trim().matches(/(quantity|due|date)/)
        });

        let user_consumption_info = {
            name: req.query.name,
            email: req.query.email,
            sort: req.query.sort
        }

        user_consumption_schema.validate(user_consumption_info)
            .then((result) => {
                req.query.name = result.name;
                req.query.email = result.email;
                req.query.sort = result.sort;

                return next();
            }).catch(err => {
                logger.log('error', err.message);
                res.status(400);
                let error = helperFunctions.capitalizeString(err.errors);
                res.send({error});
            })

    }

    //validates post user consumed food items requests
    postUserFoodItems(req: Request, res: Response, next: NextFunction) {
        let user_consumption_schema = object({
            name: string().required().lowercase().trim().min(3).max(100).matches(/^[a-z]+$/),
            quantity: number().required().positive().integer().min(1)
        });

        let user_consumption_info = {
            name: req.body.name,
            quantity: req.body.quantity
        }

        user_consumption_schema.validate(user_consumption_info)
            .then((result) => {
                req.body.name = result.name;
                req.body.quantity = result.quantity;

                return next();
            }).catch(err => {
                logger.log('error', err.message);
                res.status(400);
                let error = helperFunctions.capitalizeString(err.errors);
                res.send({error});
            })
    }

    //validates delete user consumed food items requests
    deleteUserFoodItems(req: Request, res: Response, next: NextFunction) {
        let user_consumption_schema = object({
            name: string().required().lowercase().trim().min(3).max(100).matches(/^[a-z]+$/),
            email: string().email().required().trim().max(100)
        });

        let user_consumption_info = {
            name: req.body.name,
            email: req.body.email
        }

        user_consumption_schema.validate(user_consumption_info)
            .then((result) => {
                req.body.name = result.name;
                req.body.email = result.email;

                return next();
            }).catch(err => {
                logger.log('error', err.message);
                res.status(400);
                let error = helperFunctions.capitalizeString(err.errors);
                res.send({error});
            })
    }
}
