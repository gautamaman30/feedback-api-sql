"use strict";
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
const index_1 = require("../models/index");
const index_2 = require("../utils/index");
class FeedbackService {
    getAllFeedbacks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield index_1.database.findFeedbacks({});
                if (result.error) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                return result;
            }
            catch (err) {
                console.log(err);
                return { error: index_2.Errors.INTERNAL_ERROR };
            }
        });
    }
    getFeedbacks(feedback_info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield index_1.database.findFeedbacks(feedback_info);
                if (result.error) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                return result;
            }
            catch (err) {
                console.log(err);
                return { error: index_2.Errors.INTERNAL_ERROR };
            }
        });
    }
    getFeedbacksFilteredAndSorted(filter, sort) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result;
                if (filter === "status") {
                    filter = { "status": "approved" };
                }
                else if (filter) {
                    filter = { "entity": filter };
                }
                else {
                    filter = {};
                }
                if (sort === "date") {
                    sort = "created_on";
                }
                if (sort) {
                    result = yield index_1.database.findFeedbacksSorted(filter, sort);
                }
                else {
                    result = yield index_1.database.findFeedbacks(filter);
                }
                if (result.error) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                return result;
            }
            catch (err) {
                console.log(err);
                return { error: index_2.Errors.INTERNAL_ERROR };
            }
        });
    }
    editFeedbackStatus(feedback_info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield index_1.database.updateFeedback({ feedback_id: feedback_info.feedback_id }, { status: feedback_info.status });
                if (result.error) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                if (result.matchedCount < 1) {
                    throw new Error(index_2.Errors.FEEDBACK_NOT_FOUND);
                }
                return { message: index_2.Messages.FEEDBACK_UPDATED };
            }
            catch (err) {
                console.log(err);
                return { error: err.message };
            }
        });
    }
    editFeedbackCount(feedback_info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield index_1.database.updateFeedbackCount({ feedback_id: feedback_info.feedback_id }, { count_users: feedback_info.count_users });
                if (result.error) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                if (result.matchedCount < 1) {
                    throw new Error(index_2.Errors.FEEDBACK_NOT_FOUND);
                }
                return { message: index_2.Messages.FEEDBACK_UPDATED };
            }
            catch (err) {
                console.log(err);
                return { error: err.message };
            }
        });
    }
    editFeedback(feedback_info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield index_1.database.updateFeedback({ feedback_id: feedback_info.feedback_id }, { feedback: feedback_info.feedback });
                if (result.error) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                if (result.matchedCount < 1) {
                    throw new Error(index_2.Errors.FEEDBACK_NOT_FOUND);
                }
                return { message: index_2.Messages.FEEDBACK_UPDATED };
            }
            catch (err) {
                console.log(err);
                return { error: err.message };
            }
        });
    }
    removeFeedback(feedback_info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield index_1.database.deleteFeedback({ feedback_id: feedback_info.feedback_id });
                if (result.error) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                if (result.deletedCount !== 1) {
                    throw new Error(index_2.Errors.FEEDBACK_NOT_FOUND);
                }
                return { message: index_2.Messages.FEEDBACK_DELETED };
            }
            catch (err) {
                console.log(err);
                return { error: err.message };
            }
        });
    }
    checkFeedbackExist(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let feedback_info = {};
                feedback_info[key] = value;
                const result = yield index_1.database.findFeedback(feedback_info);
                if (!result) {
                    throw new Error(index_2.Errors.FEEDBACK_NOT_FOUND);
                }
                if (result.error) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                return result;
            }
            catch (err) {
                console.log(err);
                return { error: err.message };
            }
        });
    }
    addFeedback(feedback_info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let new_feedback;
                new_feedback = {
                    feedback_id: index_2.helperFunctions.generateId(),
                    name: feedback_info.name,
                    feedback: feedback_info.feedback,
                    posted_by: feedback_info.posted_by,
                    entity: feedback_info.entity,
                    entity_id: feedback_info.entity_id,
                    status: 'waiting',
                    created_on: index_2.helperFunctions.getFormatedDate(new Date()),
                    count: 0
                };
                const result = yield index_1.database.insertFeedback(new_feedback);
                if (result.error || result.insertedCount < 1) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                return { message: index_2.Messages.FEEDBACK_CREATED };
            }
            catch (err) {
                console.log(err);
                return { error: err.message };
            }
        });
    }
    filterFeedback(feedback_array, key, values) {
        let set = index_2.helperFunctions.convertArrayToSet(values);
        return feedback_array.filter((item) => item[key] && set.has(item[key]) ? true : false);
    }
}
exports.default = FeedbackService;
