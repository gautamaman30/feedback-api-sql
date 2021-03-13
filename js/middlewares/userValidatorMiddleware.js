"use strict";
/*
    this file handles the validation for all
    user related requests,
    using yup library
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidator = void 0;
const index_1 = require("../utils/index");
const yup_1 = require("yup");
const configLogger_1 = require("../configLogger");
class UserValidator {
    //validates delete user requests
    deleteUser(req, res, next) {
        let user_schema = yup_1.object({
            email: yup_1.string().email().required().trim().max(100)
        });
        let user_info = {
            email: req.body.email
        };
        user_schema.validate(user_info)
            .then((result) => {
            req.body.email = result.email;
            return next();
        }).catch(err => {
            configLogger_1.logger.log('error', err.message);
            res.status(400);
            let error = index_1.helperFunctions.capitalizeString(err.errors);
            res.send({ error });
        });
    }
    //validates user login requests
    loginUser(req, res, next) {
        let user_schema = yup_1.object({
            email: yup_1.string().email().required().trim().max(100),
            password: yup_1.string().required().trim().min(8).max(100)
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
            configLogger_1.logger.log('error', err.message);
            res.status(400);
            let error = index_1.helperFunctions.capitalizeString(err.errors);
            res.send({ error });
        });
    }
    //validates post user requests
    postUser(req, res, next) {
        let user_schema = yup_1.object({
            name: yup_1.string().required().lowercase().trim().min(3).max(50).matches(/^[a-z]+$/),
            email: yup_1.string().email().required().trim().max(100),
            title: yup_1.string().trim().uppercase().min(3).max(100),
            date_of_birth: yup_1.string().trim().length(10).matches(/^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/, "Date of birth must match with format mm/dd/yyyy")
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
            configLogger_1.logger.log('error', err.message);
            res.status(400);
            let error = index_1.helperFunctions.capitalizeString(err.errors);
            res.send({ error });
        });
    }
    //validates update user requests
    updateUser(req, res, next) {
        let user_schema = yup_1.object({
            password: yup_1.string().trim().min(8).max(100).matches(/^[a-zA-Z0-9!@#$%&*]+$/),
            title: yup_1.string().trim().uppercase().min(3).max(100),
            date_of_birth: yup_1.string().trim().length(10).matches(/^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/, "Date of birth must match with format mm/dd/yyyy")
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
            configLogger_1.logger.log('error', err.message);
            res.status(400);
            let error = index_1.helperFunctions.capitalizeString(err.errors);
            res.send({ error });
        });
    }
    //validates get user consumed food items requests
    getUserFoodItems(req, res, next) {
        let user_consumption_schema = yup_1.object({
            food: yup_1.string().lowercase().trim().min(3).max(100).matches(/^[a-z]+$/),
            email: yup_1.string().email().trim().max(100),
            sort: yup_1.string().trim().matches(/(quantity|due|date)/)
        });
        let user_consumption_info = {
            food: req.query.food,
            email: req.query.email,
            sort: req.query.sort
        };
        user_consumption_schema.validate(user_consumption_info)
            .then((result) => {
            req.query.food = result.food;
            req.query.email = result.email;
            req.query.sort = result.sort;
            return next();
        }).catch(err => {
            configLogger_1.logger.log('error', err.message);
            res.status(400);
            let error = index_1.helperFunctions.capitalizeString(err.errors);
            res.send({ error });
        });
    }
    //validates get user's total amount due for consumed food items requests
    getUserTotalAmountDue(req, res, next) {
        let user_consumption_schema = yup_1.object({
            food: yup_1.string().lowercase().trim().min(3).max(100).matches(/^[a-z]+$/),
            email: yup_1.string().email().trim().max(100)
        });
        let user_consumption_info = {
            food: req.query.food,
            email: req.query.email
        };
        user_consumption_schema.validate(user_consumption_info)
            .then((result) => {
            req.query.food = result.food;
            req.query.email = result.email;
            return next();
        }).catch(err => {
            configLogger_1.logger.log('error', err.message);
            res.status(400);
            let error = index_1.helperFunctions.capitalizeString(err.errors);
            res.send({ error });
        });
    }
    //validates post user consumed food items requests
    postUserFoodItems(req, res, next) {
        let user_consumption_schema = yup_1.object({
            food: yup_1.string().required().lowercase().trim().min(3).max(100).matches(/^[a-z]+$/),
            quantity: yup_1.number().required().positive().integer().min(1)
        });
        let user_consumption_info = {
            food: req.body.food,
            quantity: req.body.quantity
        };
        user_consumption_schema.validate(user_consumption_info)
            .then((result) => {
            req.body.food = result.food;
            req.body.quantity = result.quantity;
            return next();
        }).catch(err => {
            configLogger_1.logger.log('error', err.message);
            res.status(400);
            let error = index_1.helperFunctions.capitalizeString(err.errors);
            res.send({ error });
        });
    }
    //validates delete user consumed food items requests
    deleteUserFoodItems(req, res, next) {
        let user_consumption_schema = yup_1.object({
            food: yup_1.string().required().lowercase().trim().min(3).max(100).matches(/^[a-z]+$/),
            email: yup_1.string().email().required().trim().max(100)
        });
        let user_consumption_info = {
            food: req.body.food,
            email: req.body.email
        };
        user_consumption_schema.validate(user_consumption_info)
            .then((result) => {
            req.body.food = result.food;
            req.body.email = result.email;
            return next();
        }).catch(err => {
            configLogger_1.logger.log('error', err.message);
            res.status(400);
            let error = index_1.helperFunctions.capitalizeString(err.errors);
            res.send({ error });
        });
    }
}
exports.UserValidator = UserValidator;
