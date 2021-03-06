/*
    this file handles the validation for all
    feedbacks related requests,
    using yup library
*/

import {Request, Response, NextFunction} from "express"
import {object, string } from "yup"
import { helperFunctions } from "../utils/index"
import {logger} from "../configLogger"

export class FeedbackValidator{

    //validates get requests for feedbacks
    getFeedbacks(req: Request, res: Response, next: NextFunction){
        let userSchema = object({
            filter: string().trim().matches(/(user|technology|status)/),
            sort: string().trim().matches(/(date|count)/)
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
                logger.log('error', err.message);
                res.status(400);
                let error = helperFunctions.capitalizeString(err.errors);
                res.send({error});
            })
    }

    //validates get requests for user feedbacks
    getUserFeedbacks(req: Request, res: Response, next: NextFunction){
        let userSchema = object({
            posted_by: string().email().trim().max(100),
            email: string().email().trim().max(100),
            sort: string().trim().matches(/(date|count)/)
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
                logger.log('error', err.message);
                res.status(400);
                let error = helperFunctions.capitalizeString(err.errors);
                res.send({error});
            })
    }

    //validates get requests for technology feedbacks
    getTechnologyFeedbacks(req: Request, res: Response, next: NextFunction){
        let userSchema = object({
            name: string().required().lowercase().trim().min(3).max(50).matches(/^[a-z]+$/),
            sort: string().trim().matches(/(date|count)/)
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
                logger.log('error', err.message);
                res.status(400);
                let error = helperFunctions.capitalizeString(err.errors);
                res.send({error});
            })
    }

    //validates post user feedbacks requests
    postUserFeedback(req: Request, res: Response, next: NextFunction){
        let feedbackSchema = object({
            name: string().required().trim().lowercase().min(3).max(50).matches(/^[a-z]+$/),
            email: string().email().required().trim().max(100),
            feedback: string().required().trim().min(10).max(200)
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
                logger.log('error', err.message);
                res.status(400);
                let error = helperFunctions.capitalizeString(err.errors);
                res.send({error});
            })
    }

    //validates post technology feedbacks requests
    postTechnologyFeedback(req: Request, res: Response, next: NextFunction){
        let feedbackSchema = object({
            name: string().required().trim().lowercase().min(3).max(50).matches(/^[a-z]+$/),
            feedback: string().required().trim().min(10).max(200)
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
                logger.log('error', err.message);
                res.status(400);
                let error = helperFunctions.capitalizeString(err.errors);
                res.send({error});
            })
    }

    //validates update feedbacks requests
    updateFeedback(req: Request, res: Response, next: NextFunction){
        let feedbackSchema = object({
            feedback_id: string().required().trim().length(10),
            feedback: string().required().trim().min(10).max(200)
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
                logger.log('error', err.message);
                res.status(400);
                let error = helperFunctions.capitalizeString(err.errors);
                res.send({error});
            })
    }

    //validates update feedbacks status requests
    updateFeedbackStatus(req: Request, res: Response, next: NextFunction){
        let feedbackSchema = object({
            feedback_id: string().required().trim().length(10),
            status: string().required().trim().lowercase().matches(/(approved|rejected)/)
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
                logger.log('error', err.message);
                res.status(400);
                let error = helperFunctions.capitalizeString(err.errors);
                res.send({error});
            })
    }

    //validates update feedbacks count requests
    updateFeedbackCount(req: Request, res: Response, next: NextFunction){
        let feedbackSchema = object({
            feedback_id: string().required().trim().length(10),
        });

        let feedback_info = {
            feedback_id: req.body.feedback_id
        };

        feedbackSchema.validate(feedback_info)
            .then((result) => {
                req.body.feedback_id = result.feedback_id;

                return next();
            }).catch(err => {
                logger.log('error', err.message);
                res.status(400);
                let error = helperFunctions.capitalizeString(err.errors);
                res.send({error});
            })
    }

    //validates delete feedbacks request
    deleteFeedback(req: Request, res: Response, next: NextFunction){
        let feedbackSchema = object({
            feedback_id: string().required().trim().length(10),
        });

        let feedback_info = {
            feedback_id: req.body.feedback_id
        };

        feedbackSchema.validate(feedback_info)
            .then((result) => {
                req.body.feedback_id = result.feedback_id;

                return next();
            }).catch(err => {
                logger.log('error', err.message);
                res.status(400);
                let error = helperFunctions.capitalizeString(err.errors);
                res.send({error});
            })
    }
}
