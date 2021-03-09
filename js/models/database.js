"use strict";
/*
    this file interacts with database using typeorm library
    ( postgresql as database)
    and performs queries
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
const technology_1 = require("./technology");
const feedback_1 = require("./feedback");
class Database {
    //finds first user matching the given query
    findUser(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield typeorm_1.getRepository(user_1.Users)
                    .findOne(query);
                return result;
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
        });
    }
    //finds all users matching the given query
    findUsers(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield typeorm_1.getRepository(user_1.Users)
                    .find(query);
                return result;
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
        });
    }
    //finds all technologies matching the given query
    findTechnologies(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield typeorm_1.getRepository(technology_1.Technology)
                    .find(query);
                return result;
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
        });
    }
    //finds first technology matching the given query
    findTechnology(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield typeorm_1.getRepository(technology_1.Technology)
                    .findOne(query);
                return result;
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
        });
    }
    //finds first feedback matching the given query
    findFeedback(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield typeorm_1.getRepository(feedback_1.Feedback)
                    .findOne(query);
                return result;
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
        });
    }
    //finds all feedbacks matching the given query
    findFeedbacks(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield typeorm_1.getRepository(feedback_1.Feedback)
                    .find(query);
                return result;
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
        });
    }
    //finds all feedbacks matching the given query in descending order
    findFeedbacksSorted(query, sortField) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result;
                if (Object.keys(query).length === 0) {
                    result = yield typeorm_1.getRepository(feedback_1.Feedback)
                        .createQueryBuilder("feedback")
                        .orderBy(`feedback.${sortField}`, "DESC")
                        .getMany();
                }
                else {
                    const key = Object.keys(query)[0];
                    result = yield typeorm_1.getRepository(feedback_1.Feedback)
                        .createQueryBuilder("feedback")
                        .where(`feedback.${key} = :${key}`, query)
                        .orderBy(`feedback.${sortField}`, "DESC")
                        .getMany();
                }
                return result;
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
        });
    }
    //updates all users matching the given filter
    updateUser(filter, update) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield typeorm_1.getRepository(user_1.Users)
                    .update(filter, update);
                return result;
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
        });
    }
    //updates all technologies matching the given filter
    updateTechnology(filter, update) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield typeorm_1.getRepository(technology_1.Technology)
                    .update(filter, update);
                return result;
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
        });
    }
    //updates all feedbacks matching the given filter
    updateFeedback(filter, update) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield typeorm_1.getRepository(feedback_1.Feedback)
                    .update(filter, update);
                return result;
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
        });
    }
    //updates feedback count matching the given filter
    updateFeedbackCount(filter, update) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield typeorm_1.getRepository(feedback_1.Feedback)
                    .createQueryBuilder("feedback")
                    .update(feedback_1.Feedback)
                    .set({ count: () => "count + 1" })
                    .where("feedback_id = :feedback_id", filter)
                    .execute();
                return result;
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
        });
    }
    //inserts new user with given user information
    insertUser(user_info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield typeorm_1.getRepository(user_1.Users)
                    .insert(user_info);
                return result;
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
        });
    }
    //inserts new technology with given technology information
    insertTechnology(technology_info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield typeorm_1.getRepository(technology_1.Technology)
                    .insert(technology_info);
                return result;
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
        });
    }
    //inserts new feedback with given feedback information
    insertFeedback(feedback_info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield typeorm_1.getRepository(feedback_1.Feedback)
                    .insert(feedback_info);
                return result;
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
        });
    }
    //deletes user matching the given query
    deleteUser(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield typeorm_1.getRepository(user_1.Users)
                    .delete(query);
                return result;
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
        });
    }
    //deletes technology matching the given query
    deleteTechnology(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield typeorm_1.getRepository(technology_1.Technology)
                    .delete(query);
                return result;
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
        });
    }
    //deletes feedback matching the given query
    deleteFeedback(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield typeorm_1.getRepository(feedback_1.Feedback)
                    .delete(query);
                return result;
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
        });
    }
}
exports.Database = Database;
