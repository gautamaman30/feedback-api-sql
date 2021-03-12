/*
    this file handles the validation for all
    food items related requests,
    using yup library
*/

import {Request, Response, NextFunction} from "express"
import {object, string, number } from "yup"
import { helperFunctions } from "../utils/index"
import {logger} from "../configLogger"

export class FoodItemValidator{

    //validates get requests for food items
    getFoodItems(req: Request, res: Response, next: NextFunction){
        let foodItem_schema = object({
            name: string().lowercase().trim().min(3).max(100).matches(/^[a-z]+$/),
            sort: string().trim().matches(/(quantity|price)/)
        });

        let foodItem_info = {
            name: req.query.name,
            sort: req.query.sort
        };

        foodItem_schema.validate(foodItem_info)
            .then((result) => {
                req.query.name = result.name;
                req.query.sort = result.sort;

                return next();
            }).catch(err => {
                logger.log('error', err.message);
                res.status(400);
                let error = helperFunctions.capitalizeString(err.errors);
                res.send({error});
            })
    }

    //validates food items requests
    postFoodItem(req: Request, res: Response, next: NextFunction){
        let foodItem_schema = object({
            name: string().required().lowercase().trim().min(3).max(100).matches(/^[a-z]+$/),
            quantity: number().required().positive().integer().min(1),
            price: number().required().positive().transform((val, originalVal) => {
                return (Math.floor((val * 100)) / 100);
            }).min(1.00),
            details: string().trim().min(10).max(200).matches(/^[a-z][A-Z]+$/)
        });

        let foodItem_info = {
            name: req.body.name,
            quantity: req.body.quantity,
            price: req.body.price,
            details: req.body.details
        };

        foodItem_schema.validate(foodItem_info)
            .then((result) => {
                req.body.name = result.name;
                req.body.quantity = result.quantity;
                req.body.price = result.price;
                req.body.details = result.details;

                return next();
            }).catch(err => {
                logger.log('error', err.message);
                res.status(400);
                let error = helperFunctions.capitalizeString(err.errors);
                res.send({error});
            })
    }

    //validates update food items requests
    updateFoodItem(req: Request, res: Response, next: NextFunction){
        let foodItem_schema = object({
            name: string().required().lowercase().trim().min(3).max(100).matches(/^[a-z]+$/),
            quantity: number().positive().integer().min(1),
            price: number().positive().transform((val, originalVal) => {
                return (Math.floor((val * 100)) / 100);
            }).min(1.00),
            details: string().trim().min(10).max(200).matches(/^[a-z][A-Z]+$/)
        });

        let foodItem_info = {
            name: req.body.name,
            quantity: req.body.quantity,
            price: req.body.price,
            details: req.body.details
        };

        foodItem_schema.validate(foodItem_info)
            .then((result) => {
                req.body.name = result.name;
                req.body.quantity = result.quantity;
                req.body.price = result.price;
                req.body.details = result.details;

                return next();
            }).catch(err => {
                logger.log('error', err.message);
                res.status(400);
                let error = helperFunctions.capitalizeString(err.errors);
                res.send({error});
            })
    }

    //validates delete food items request
    deleteFoodItem(req: Request, res: Response, next: NextFunction){
        let foodItem_schema = object({
            name: string().required().lowercase().trim().min(3).max(100).matches(/^[a-z]+$/)
        });

        let foodItem_info = {
            name: req.body.name
        };

        foodItem_schema.validate(foodItem_info)
            .then((result) => {
                req.body.name = result.name;

                return next();
            }).catch(err => {
                logger.log('error', err.message);
                res.status(400);
                let error = helperFunctions.capitalizeString(err.errors);
                res.send({error});
            })
    }
}
