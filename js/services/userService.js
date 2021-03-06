"use strict";
/*
    this file handles the services for all the user related
    actions and interacts with database
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
const index_1 = require("../models/index");
const index_2 = require("../utils/index");
const configLogger_1 = require("../configLogger");
class UserService {
    //get all users
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield index_1.database.findUsers({});
                if (!Array.isArray(result) && result.error) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                return result;
            }
            catch (err) {
                configLogger_1.logger.log('error', err.message);
                return { error: index_2.Errors.INTERNAL_ERROR };
            }
        });
    }
    //get all users with given key and value query
    getUsers(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user_info = {};
                user_info[key] = value;
                const result = yield index_1.database.findUsers(user_info);
                if (!result) {
                    throw new Error(index_2.Errors.USER_NOT_FOUND);
                }
                if (!Array.isArray(result) && result.error) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                return result;
            }
            catch (err) {
                configLogger_1.logger.log('error', err.message);
                return { error: err.message };
            }
        });
    }
    //removes user matching the given user email
    removeUser(user_info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield index_1.database.deleteUser({ email: user_info.email });
                if (result.error) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                if (result.affected !== 1) {
                    throw new Error(index_2.Errors.USER_NOT_FOUND);
                }
                return { message: index_2.Messages.USER_DELETED };
            }
            catch (err) {
                configLogger_1.logger.log('error', err.message);
                return { error: err.message };
            }
        });
    }
    //finds if a user exists with the given key and value
    checkUserExist(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user_info = {};
                user_info[key] = value;
                const result = yield index_1.database.findUser(user_info);
                if (!result) {
                    throw new Error(index_2.Errors.USER_NOT_FOUND);
                }
                if (result.error) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                return result;
            }
            catch (err) {
                configLogger_1.logger.log('error', err.message);
                return { error: err.message };
            }
        });
    }
    //finds if the admin exists with the given key and value
    checkAdminExist(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user_info = {};
                user_info[key] = value;
                const result = yield index_1.database.findUser(user_info);
                if (!result) {
                    throw new Error(index_2.Errors.ADMIN_NOT_FOUND);
                }
                if (result.error) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                if (result.roles !== "admin") {
                    throw new Error(index_2.Errors.NOT_ADMIN);
                }
                return result;
            }
            catch (err) {
                configLogger_1.logger.log('error', err.message);
                return { error: err.message };
            }
        });
    }
    //adds a new user to the database given all the details about the user
    addUser(user_info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = {};
                let password = user_info.name + '1234';
                let hashedPassword = yield index_2.helperFunctions.hashPassword(password);
                user = {
                    user_id: index_2.helperFunctions.generateId(),
                    name: user_info.name,
                    email: user_info.email,
                    password: hashedPassword,
                    roles: "employee"
                };
                if (user_info.title)
                    user.title = user_info.title;
                if (user_info.date_of_birth) {
                    let temp_date_of_birth = index_2.helperFunctions.convertStringToDate(user_info.date_of_birth);
                    4;
                    if (!temp_date_of_birth) {
                        throw new Error(index_2.Errors.INVALID_DATE);
                    }
                    user.date_of_birth = index_2.helperFunctions.getFormatedDate(temp_date_of_birth);
                }
                const result = yield index_1.database.insertUser(user);
                if (result.error) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                user.password = password;
                return user;
            }
            catch (err) {
                configLogger_1.logger.log('error', err.message);
                return { error: err.message };
            }
        });
    }
    //updates user's password, title and date of birth
    editUser(user_info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let update = {};
                if (user_info.password) {
                    update.password = yield index_2.helperFunctions.hashPassword(user_info.password);
                }
                if (user_info.title) {
                    update.title = user_info.title;
                }
                if (user_info.date_of_birth) {
                    let temp_date_of_birth = index_2.helperFunctions.convertStringToDate(user_info.date_of_birth);
                    4;
                    if (!temp_date_of_birth) {
                        throw new Error(index_2.Errors.INVALID_DATE);
                    }
                    update.date_of_birth = index_2.helperFunctions.getFormatedDate(temp_date_of_birth);
                }
                let filter = { email: user_info.email };
                const result = yield index_1.database.updateUser(filter, update);
                if (result.error || result.affected < 1) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                return { message: index_2.Messages.USER_UPDATED };
            }
            catch (err) {
                configLogger_1.logger.log('error', err.message);
                return { error: err.message };
            }
        });
    }
    //get consumed food item details
    getConsumptionDetails(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield index_1.database.findUserFoodItem(query);
                if (result.error) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                return result;
            }
            catch (err) {
                configLogger_1.logger.log('error', err.message);
                return { error: err.message };
            }
        });
    }
    //get consumed food item details sorted
    getConsumptionDetailsSorted(query, sort) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (sort === "date") {
                    sort = "consumed_on";
                }
                if (sort === "due") {
                    sort = "amount_due";
                }
                const result = yield index_1.database.findUserFoodItemSorted(query, sort);
                if (result.error) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                return result;
            }
            catch (err) {
                configLogger_1.logger.log('error', err.message);
                return { error: err.message };
            }
        });
    }
    //get total amount due for given food item for all users
    getTotalAmountDueByFoodItem(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield index_1.database.findTotalAmountDueByFoodItem(query);
                if (result.error) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                return result;
            }
            catch (err) {
                configLogger_1.logger.log('error', err.message);
                return { error: err.message };
            }
        });
    }
    //get total amount due for given food item for given user
    getTotalAmountDueByUserAndFoodItem(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield index_1.database.findTotalAmountDueByUserAndFoodItem(query);
                if (result.error) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                return result;
            }
            catch (err) {
                configLogger_1.logger.log('error', err.message);
                return { error: err.message };
            }
        });
    }
    //get total amount due for all food items by a user
    getTotalAmountDue(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield index_1.database.findTotalAmountDue(query);
                if (result.error) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                return result;
            }
            catch (err) {
                configLogger_1.logger.log('error', err.message);
                return { error: err.message };
            }
        });
    }
    //get total amount due for all users
    getTotalAmountDueForAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield index_1.database.findTotalAmountDueForAllUsers();
                if (result.error) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                return result;
            }
            catch (err) {
                configLogger_1.logger.log('error', err.message);
                return { error: err.message };
            }
        });
    }
    //adds a new consumed food item by user
    addUserFoodItem(user_food_info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield index_1.database.insertUserFoodItem(user_food_info);
                if (result.error) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                return { message: index_2.Messages.USER_FOOD_CREATED };
            }
            catch (err) {
                configLogger_1.logger.log('error', err.message);
                return { error: err.message };
            }
        });
    }
    //deletes the consumed food item by user
    removeUserFoodItem(user_food_info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield index_1.database.deleteUserFoodItem(user_food_info);
                if (result.error) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                return { message: index_2.Messages.USER_FOOD_DELETED };
            }
            catch (err) {
                configLogger_1.logger.log('error', err.message);
                return { error: err.message };
            }
        });
    }
}
exports.default = UserService;
