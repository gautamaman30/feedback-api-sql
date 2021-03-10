/*
    this file handles the controllers for all the feedback related
    actions and interacts with feedback's services
*/

import {Request, Response } from "express"
import {userService, technologyService, feedbackService} from "../services/index"
import {helperFunctions, Errors} from "../utils/index"

export default class FeedbackController{

    //handles get feedbacks requests
    async getFeedbacks(req: Request, res: Response) {
        try{
            const user_id: string = req.body.user_id;
            const feedback_id: any = req.query.feedback_id;
            const filter: any = req.query.filter;
            const sort: any = req.query.sort;


            let feedbacks: any = [];

            if(feedback_id) {
                const feedback = await feedbackService.checkFeedbackExist("feedback_id", feedback_id);
                if(feedback.error) {
                    throw new Error(feedback.error);
                }
                feedbacks[0] = feedback;
            } else if(filter || sort) {
                feedbacks = await feedbackService.getFeedbacksFilteredAndSorted(filter, sort);
            } else {
                feedbacks = await feedbackService.getAllFeedbacks();
            }

            if(feedbacks.error) {
                throw new Error(feedbacks.error);
            }

            let user = await userService.checkUserExist("user_id", user_id);
            if(user.error){
                throw new Error(user.error);
            }
            if(user.roles !== "admin"){
                feedbacks = feedbackService.filterFeedback(feedbacks, "status", ["approved"]);
            }

            feedbacks = helperFunctions.removeSensitiveData(feedbacks);

            res.status(200);
            res.send({feedbacks});
        } catch(e){
            console.log(e.message);
            res.status(400);
            res.send({error: e.message});
        }
    }

    //handles get user feedbacks requests
    async getUserFeedbacks(req: Request, res: Response) {
        try{
            const user_id: string = req.body.user_id;
            const posted_by: any = req.query.posted_by;
            const email: any = req.query.email;
            const sort: any = req.query.sort;

            let feedbacks: any;

            if(posted_by) {
                if(sort) {
                    feedbacks = await feedbackService.getFeedbacksQuerySorted({posted_by}, sort);

                } else {
                    feedbacks = await feedbackService.getFeedbacks({posted_by});
                }
            } else if(email) {
                if(sort) {
                    feedbacks = await feedbackService.getFeedbacksQuerySorted({entity_id: email}, sort);
                } else {
                    feedbacks = await feedbackService.getFeedbacks({entity_id: email});
                }
            } else {
                feedbacks = await feedbackService.getAllFeedbacks();
            }

            if(feedbacks.error) {
                throw new Error(feedbacks.error);
            }

            let user = await userService.checkUserExist("user_id", user_id);
            if(user.error){
                throw new Error(user.error);
            }
            if(user.roles !== "admin"){
                feedbacks = feedbackService.filterFeedback(feedbacks, "status", ["approved"]);
            }

            feedbacks = helperFunctions.removeSensitiveData(feedbacks);

            res.status(200);
            res.send({feedbacks});
        } catch(e){
            console.log(e.message);
            res.status(400);
            res.send({error: e.message});
        }
    }

    //handles get technology feedbacks requests
    async getTechnologyFeedbacks(req: Request, res: Response) {
        try{
            const user_id: string = req.body.user_id;
            const name: any = req.query.name;
            const sort: any = req.query.sort;

            let feedbacks: any;

            if(name) {
                if(sort) {
                    feedbacks = await feedbackService.getFeedbacksQuerySorted({name, entity: 'technology'}, sort);

                } else {
                    feedbacks = await feedbackService.getFeedbacks({name, entity: 'technology'});
                }
            } else {
                feedbacks = await feedbackService.getAllFeedbacks();
            }

            if(feedbacks.error) {
                throw new Error(feedbacks.error);
            }

            let user: any = await userService.checkUserExist("user_id", user_id);
            if(user.error){
                throw new Error(user.error);
            }
            if(user.roles !== "admin"){
                feedbacks = feedbackService.filterFeedback(feedbacks, "status", ["approved"]);
            }

            feedbacks = helperFunctions.removeSensitiveData(feedbacks);

            res.status(200);
            res.send({feedbacks});
        } catch(e){
            console.log(e.message);
            res.status(400);
            res.send({error: e.message});
        }
    }

    //handles post user feedbacks requests
    async postUserFeedback(req: Request, res: Response){
        try{
            const user_id: string = req.body.user_id;
            const feedback: string = req.body.feedback;
            const email: string = req.body.email;
            let name: string = req.body.name;

            const user = await userService.checkUserExist("user_id", user_id);
            if(user.error) {
                throw new Error(user.error);
            }
            if(user.roles === "admin"){
                throw new Error(Errors.ADMIN_POST_FEEDBACK);
            }

            let feedback_info = {name, feedback, posted_by: <string>user.email, entity: <'user' | 'technology'>'user', entity_id: user.email};

            const check_user = await userService.checkUserExist("email", email);
            if(check_user.error){
                throw new Error(check_user.error);
            }
            if(check_user.user_id === user_id) {
                throw new Error(Errors.USER_POST_OWN_FEEDBACK)
            }

            const result = await feedbackService.addFeedback(feedback_info);
            if(result.error) {
                 throw new Error(result.error);
            }

            res.status(201);
            res.send(result);
        } catch(e){
            console.log(e.message);
            res.status(400);
            res.send({error: e.message});
        }
    }

    //handles post technology feedbacks requests
    async postTechnologyFeedback(req: Request, res: Response){
        try{
            const user_id: string = req.body.user_id;
            const feedback: string = req.body.feedback;
            let name: string = req.body.name;

            const user: any = await userService.checkUserExist("user_id", user_id);
            if(user.error) {
                throw new Error(user.error);
            }
            if(user.roles === "admin"){
                throw new Error(Errors.ADMIN_POST_FEEDBACK);
            }

            let feedback_info = {name, feedback, posted_by: user.email, entity: <'technology' | 'user'>'technology', entity_id: name};

            const technology = await technologyService.checkTechnologyExist("name", name);
            if(technology.error) {
                throw new Error(technology.error);
            }

            const result = await feedbackService.addFeedback(feedback_info);
            if(result.error) {
                 throw new Error(result.error);
            }

            res.status(201);
            res.send(result);
        } catch(e){
            console.log(e.message);
            res.status(400);
            res.send({error: e.message});
        }
    }

    //handles update feedbacks requests
    async updateFeedback(req: Request, res: Response){
        try{
            const user_id: string = req.body.user_id;
            const feedback_id: string = req.body.feedback_id;
            const feedback: string = req.body.feedback;

            const user = await userService.checkUserExist("user_id", user_id);
            if(user.error) {
                throw new Error(user.error);
            }
            if(user.roles === "admin"){
                throw new Error(Errors.ADMIN_EDIT_FEEDBACK);
            }

            const check_feedback = await feedbackService.checkFeedbackExist("feedback_id", feedback_id);
            if(check_feedback.error) {
                throw new Error(check_feedback.error);
            }
            if(check_feedback.posted_by !== user.email) {
                throw new Error(Errors.USER_EDIT_OTHERS_FEEDBACK);
            }

            const result = await feedbackService.editFeedback({feedback_id, feedback});
            if(result.error) {
                throw new Error(result.error);
            }

            res.status(200);
            res.send(result);
        } catch(e){
            console.log(e.message);
            res.status(400);
            res.send({error: e.message});
        }
    }

    //handles update feedbacks status requests
    async updateFeedbackStatus(req: Request, res: Response){
        try{
            const admin_id: string = req.body.user_id;
            const feedback_id: string = req.body.feedback_id;
            let feedback_status: string = req.body.status;

            const admin = await userService.checkAdminExist("user_id", admin_id);
            if(admin.error){
                throw new Error(admin.error);
            }

            feedback_status = feedback_status.toLowerCase();
            let status = <'approved' | 'rejected'>feedback_status;

            const feedback = await feedbackService.editFeedbackStatus({feedback_id, status});
            if(feedback.error) {
                throw new Error(feedback.error);
            }

            res.status(200);
            res.send(feedback);
        } catch(e){
            console.log(e.message);
            res.status(400);
            res.send({error: e.message});
        }
    }

    //handles update feedbacks count requests
    async updateFeedbackCount(req: Request, res: Response){
        try{
            const user_id: string = req.body.user_id;
            const feedback_id: string = req.body.feedback_id;

            const user = await userService.checkUserExist("user_id", user_id);
            if(user.error) {
                throw new Error(user.error);
            }
            if(user.roles === "admin") {
                throw new Error(Errors.ADMIN_EDIT_FEEDBACK);
            }

            const feedback = await feedbackService.checkFeedbackExist("feedback_id", feedback_id);
            if(feedback.error) {
                throw new Error(feedback.error);
            }
            for(let i of feedback.count_users){
                if(i === user.name){
                    throw new Error(Errors.FEEDBACK_USER_COUNT_EXIST);
                }
            }

            const result = await feedbackService.editFeedbackCount({feedback_id, count_users: user.name});
            if(feedback.error) {
                throw new Error(feedback.error);
            }

            res.status(200);
            res.send(result);
        } catch(e){
            console.log(e.message);
            res.status(400);
            res.send({error: e.message});
        }
    }

    //handles delete feedbacks requests
    async deleteFeedback(req: Request, res: Response){
        try{
            const admin_id: string = req.body.user_id;
            const feedback_id: string = req.body.feedback_id;

            const admin = await userService.checkAdminExist("user_id", admin_id);
            if(admin.error) {
                throw new Error(admin.error);
            }

            const feedback = await feedbackService.checkFeedbackExist("feedback_id", feedback_id);
            if(feedback.error) {
                throw new Error(feedback.error);
            }

            const result = await feedbackService.removeFeedback({feedback_id});
            if(result.error) {
                throw new Error(result.error);
            }

            res.status(200);
            res.send(result);
        } catch(e){
            console.log(e.message);
            res.status(400);
            res.send({error: e.message});
        }
    }
}
