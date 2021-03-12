"use strict";
/*
    this file handles the validation for all
    food items related requests,
    using yup library
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodItemValidator = void 0;
const yup_1 = require("yup");
const index_1 = require("../utils/index");
const configLogger_1 = require("../configLogger");
class FoodItemValidator {
    //validates get requests for food items
    getFoodItems(req, res, next) {
        let foodItem_schema = yup_1.object({
            name: yup_1.string().lowercase().trim().min(3).max(100).matches(/^[a-z]+$/),
            sort: yup_1.string().trim().matches(/(quantity|price)/)
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
            configLogger_1.logger.log('error', err.message);
            res.status(400);
            let error = index_1.helperFunctions.capitalizeString(err.errors);
            res.send({ error });
        });
    }
    //validates food items requests
    postFoodItem(req, res, next) {
        let foodItem_schema = yup_1.object({
            name: yup_1.string().required().lowercase().trim().min(3).max(100).matches(/^[a-z]+$/),
            quantity: yup_1.number().required().positive().integer().min(1),
            price: yup_1.number().required().positive().transform((val, originalVal) => {
                return (Math.floor((val * 100)) / 100);
            }).min(1.00),
            details: yup_1.string().trim().min(10).max(200).matches(/^[a-z][A-Z]+$/)
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
            configLogger_1.logger.log('error', err.message);
            res.status(400);
            let error = index_1.helperFunctions.capitalizeString(err.errors);
            res.send({ error });
        });
    }
    //validates update food items requests
    updateFoodItem(req, res, next) {
        let foodItem_schema = yup_1.object({
            name: yup_1.string().required().lowercase().trim().min(3).max(100).matches(/^[a-z]+$/),
            quantity: yup_1.number().positive().integer().min(1),
            price: yup_1.number().positive().transform((val, originalVal) => {
                return (Math.floor((val * 100)) / 100);
            }).min(1.00),
            details: yup_1.string().trim().min(10).max(200).matches(/^[a-z][A-Z]+$/)
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
            configLogger_1.logger.log('error', err.message);
            res.status(400);
            let error = index_1.helperFunctions.capitalizeString(err.errors);
            res.send({ error });
        });
    }
    //validates delete food items request
    deleteFoodItem(req, res, next) {
        let foodItem_schema = yup_1.object({
            name: yup_1.string().required().lowercase().trim().min(3).max(100).matches(/^[a-z]+$/)
        });
        let foodItem_info = {
            name: req.body.name
        };
        foodItem_schema.validate(foodItem_info)
            .then((result) => {
            req.body.name = result.name;
            return next();
        }).catch(err => {
            configLogger_1.logger.log('error', err.message);
            res.status(400);
            let error = index_1.helperFunctions.capitalizeString(err.errors);
            res.send({ error });
        });
    }
}
exports.FoodItemValidator = FoodItemValidator;
