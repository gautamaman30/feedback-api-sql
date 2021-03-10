"use strict";
/*
    this file handles the validation for all
    feedbacks related requests,
    using yup library
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackValidator = void 0;
const yup_1 = require("yup");
const index_1 = require("../utils/index");
const configLogger_1 = require("../configLogger");
class FeedbackValidator {
    //validates get requests for feedbacks
    getFeedbacks(req, res, next) {
        let userSchema = yup_1.object({
            filter: yup_1.string().trim().matches(/(user|technology|status)/),
            sort: yup_1.string().trim().matches(/(date|count)/)
        });
        let user_info = {
            filter: req.query.filter,
            sort: req.query.sort
        };
        userSchema.validate(user_info)
            .then((result) => {
            req.query.filter = result.filter;
            req.query.sort = result.sort;
            return next();
        }).catch(err => {
            configLogger_1.logger.log('error', err.message);
            res.status(400);
            let error = index_1.helperFunctions.capitalizeString(err.errors);
            res.send({ error });
        });
    }
    //validates get requests for user feedbacks
    getUserFeedbacks(req, res, next) {
        let userSchema = yup_1.object({
            posted_by: yup_1.string().email().trim().max(100),
            email: yup_1.string().email().trim().max(100),
            sort: yup_1.string().trim().matches(/(date|count)/)
        });
        let user_info = {
            posted_by: req.query.posted_by,
            email: req.query.email,
            sort: req.query.sort
        };
        userSchema.validate(user_info)
            .then((result) => {
            req.query.posted_by = result.posted_by;
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
    //validates get requests for technology feedbacks
    getTechnologyFeedbacks(req, res, next) {
        let userSchema = yup_1.object({
            name: yup_1.string().required().lowercase().trim().min(3).max(50).matches(/^[a-z]+$/),
            sort: yup_1.string().trim().matches(/(date|count)/)
        });
        let user_info = {
            name: req.query.name,
            sort: req.query.sort
        };
        userSchema.validate(user_info)
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
    //validates post user feedbacks requests
    postUserFeedback(req, res, next) {
        let feedbackSchema = yup_1.object({
            name: yup_1.string().required().trim().lowercase().min(3).max(50).matches(/^[a-z]+$/),
            email: yup_1.string().email().required().trim().max(100),
            feedback: yup_1.string().required().trim().min(10).max(200)
        });
        let feedback_info = {
            name: req.body.name,
            email: req.body.email,
            feedback: req.body.feedback
        };
        feedbackSchema.validate(feedback_info)
            .then((result) => {
            req.body.email = result.email;
            req.body.name = result.name;
            req.body.feedback = result.feedback;
            return next();
        }).catch(err => {
            configLogger_1.logger.log('error', err.message);
            res.status(400);
            let error = index_1.helperFunctions.capitalizeString(err.errors);
            res.send({ error });
        });
    }
    //validates post technology feedbacks requests
    postTechnologyFeedback(req, res, next) {
        let feedbackSchema = yup_1.object({
            name: yup_1.string().required().trim().lowercase().min(3).max(50).matches(/^[a-z]+$/),
            feedback: yup_1.string().required().trim().min(10).max(200)
        });
        let feedback_info = {
            name: req.body.name,
            feedback: req.body.feedback
        };
        feedbackSchema.validate(feedback_info)
            .then((result) => {
            req.body.name = result.name;
            req.body.feedback = result.feedback;
            return next();
        }).catch(err => {
            configLogger_1.logger.log('error', err.message);
            res.status(400);
            let error = index_1.helperFunctions.capitalizeString(err.errors);
            res.send({ error });
        });
    }
    //validates update feedbacks requests
    updateFeedback(req, res, next) {
        let feedbackSchema = yup_1.object({
            feedback_id: yup_1.string().required().trim().length(10),
            feedback: yup_1.string().required().trim().min(10).max(200)
        });
        let feedback_info = {
            feedback_id: req.body.feedback_id,
            feedback: req.body.feedback
        };
        feedbackSchema.validate(feedback_info)
            .then((result) => {
            req.body.feedback_id = result.feedback_id;
            req.body.feedback = result.feedback;
            return next();
        }).catch(err => {
            configLogger_1.logger.log('error', err.message);
            res.status(400);
            let error = index_1.helperFunctions.capitalizeString(err.errors);
            res.send({ error });
        });
    }
    //validates update feedbacks status requests
    updateFeedbackStatus(req, res, next) {
        let feedbackSchema = yup_1.object({
            feedback_id: yup_1.string().required().trim().length(10),
            status: yup_1.string().required().trim().lowercase().matches(/(approved|rejected)/)
        });
        let feedback_info = {
            feedback_id: req.body.feedback_id,
            status: req.body.status,
        };
        feedbackSchema.validate(feedback_info)
            .then((result) => {
            req.body.feedback_id = result.feedback_id;
            req.body.status = result.status;
            return next();
        }).catch(err => {
            configLogger_1.logger.log('error', err.message);
            res.status(400);
            let error = index_1.helperFunctions.capitalizeString(err.errors);
            res.send({ error });
        });
    }
    //validates update feedbacks count requests
    updateFeedbackCount(req, res, next) {
        let feedbackSchema = yup_1.object({
            feedback_id: yup_1.string().required().trim().length(10),
        });
        let feedback_info = {
            feedback_id: req.body.feedback_id
        };
        feedbackSchema.validate(feedback_info)
            .then((result) => {
            req.body.feedback_id = result.feedback_id;
            return next();
        }).catch(err => {
            configLogger_1.logger.log('error', err.message);
            res.status(400);
            let error = index_1.helperFunctions.capitalizeString(err.errors);
            res.send({ error });
        });
    }
    //validates delete feedbacks request
    deleteFeedback(req, res, next) {
        let feedbackSchema = yup_1.object({
            feedback_id: yup_1.string().required().trim().length(10),
        });
        let feedback_info = {
            feedback_id: req.body.feedback_id
        };
        feedbackSchema.validate(feedback_info)
            .then((result) => {
            req.body.feedback_id = result.feedback_id;
            return next();
        }).catch(err => {
            configLogger_1.logger.log('error', err.message);
            res.status(400);
            let error = index_1.helperFunctions.capitalizeString(err.errors);
            res.send({ error });
        });
    }
}
exports.FeedbackValidator = FeedbackValidator;
