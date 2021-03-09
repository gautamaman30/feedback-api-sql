/*
    this file handles the services for all the feedback related
    actions and interacts with database
*/

import { database } from '../models/index'
import {Errors, Messages, helperFunctions } from '../utils/index'


export default class FeedbackService{

    //get all the feedbacks
    async getAllFeedbacks(){
        try{
            const result: any = await database.findFeedbacks({});
            if(result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }
            return result;
        } catch(err) {
            console.log(err);
            return {error: Errors.INTERNAL_ERROR};
        }
    }

    //get all feedbacks with given query/filter
    async getFeedbacks(feedback_info){
        try{
            const result: any = await database.findFeedbacks(feedback_info);
            if(result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }
            return result;
        } catch(err) {
            console.log(err);
            return {error: Errors.INTERNAL_ERROR};
        }
    }

    /*
        get all feedbacks with given query/filter and
        sort them according to given sort field
    */
    async getFeedbacksFilteredAndSorted(filter?, sort?){
        try{
            let result: any;
            if(filter === "status") {
                filter = {"status": "approved"};
            }
            else if(filter) {
                filter = {"entity": filter};
            }
            else {
                filter = {};
            }

            if(sort === "date") {
                sort = "created_on";
            }

            if(sort) {
                result = await database.findFeedbacksSorted(filter, sort);
            }
            else {
                result = await database.findFeedbacks(filter);
            }
            if(result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }
            return result;
        } catch(err) {
            console.log(err);
            return {error: Errors.INTERNAL_ERROR};
        }
    }

    //updates the feedback status given feedback id and status
    async editFeedbackStatus(feedback_info: {feedback_id: string, status: "approved" | "rejected"}){

        try{
            const result: any = await database.updateFeedback({ feedback_id: feedback_info.feedback_id }, {status: feedback_info.status });

            if(result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }
            if(result.matchedCount < 1){
                throw new Error(Errors.FEEDBACK_NOT_FOUND);
            }
            return {message: Messages.FEEDBACK_UPDATED};
        } catch(err) {
            console.log(err);
            return {error: err.message};
        }
    }

    //updates feedback count given feedback id and name of user adding the count(count_users)
    async editFeedbackCount(feedback_info: {feedback_id: string, count_users: string}){

        try{
            const result: any = await database.updateFeedbackCount({ feedback_id: feedback_info.feedback_id }, { count_users: feedback_info.count_users });

            if(result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }
            if(result.matchedCount < 1){
                throw new Error(Errors.FEEDBACK_NOT_FOUND);
            }
            return {message: Messages.FEEDBACK_UPDATED};
        } catch(err) {
            console.log(err);
            return {error: err.message};
        }
    }

    //updates feedback content
    async editFeedback(feedback_info: {feedback_id: string, feedback: string}){
        try{
            const result: any = await database.updateFeedback({ feedback_id: feedback_info.feedback_id },  {feedback: feedback_info.feedback });

            if(result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }
            if(result.matchedCount < 1){
                throw new Error(Errors.FEEDBACK_NOT_FOUND);
            }
            return {message: Messages.FEEDBACK_UPDATED};
        } catch(err) {
            console.log(err);
            return {error: err.message};
        }
    }

    //deletes the feedback matching the given feedback id
    async removeFeedback(feedback_info: {feedback_id: string}){

        try{
            const result: any = await database.deleteFeedback({ feedback_id: feedback_info.feedback_id });

            if(result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }
            if(result.deletedCount !== 1){
                throw new Error(Errors.FEEDBACK_NOT_FOUND);
            }
            return {message: Messages.FEEDBACK_DELETED};
        } catch(err) {
            console.log(err);
            return {error: err.message};
        }
    }

    //finds if the feedback exists given the key and value
    async checkFeedbackExist(key: string, value: any){
        try{
            let feedback_info: any = {};
            feedback_info[key] = value;

            const result: any = await database.findFeedback(feedback_info);
            if(!result){
                throw new Error(Errors.FEEDBACK_NOT_FOUND);
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

    //creates a new feedback with all the given feedback information
    async addFeedback(feedback_info: {name: string, posted_by: string, feedback: string, entity_id: string, entity: 'user' | 'technology'}){
        try{
            let new_feedback: any;

            new_feedback = {
                feedback_id: helperFunctions.generateId(),
                name: feedback_info.name,
                feedback: feedback_info.feedback,
                posted_by: feedback_info.posted_by,
                entity: feedback_info.entity,
                entity_id: feedback_info.entity_id,
                status: 'waiting',
                created_on: helperFunctions.getFormatedDate(new Date()),
                count: 0
            }

            const result: any = await database.insertFeedback(new_feedback);

            if(result.error || result.insertedCount < 1){
                throw new Error(Errors.INTERNAL_ERROR);
            }

            return {message: Messages.FEEDBACK_CREATED};
        } catch(err) {
            console.log(err);
            return {error: err.message};
        }
    }

    //filter an array according to a key and set of values 
    filterFeedback(feedback_array: Array<any>, key: string, values: string[]) {
        let set = helperFunctions.convertArrayToSet(values);
        return feedback_array.filter((item) => item[key] && set.has(item[key])? true: false);
    }
}
