"use strict";
/*
    this file handles the controllers for all the user related
    actions and interacts with user's services
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
const index_1 = require("../services/index");
const index_2 = require("../utils/index");
const configLogger_1 = require("../configLogger");
class UserController {
    //handles get user requests
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.query.user_id;
                const name = req.query.name;
                const email = req.query.email;
                let result;
                if (user_id) {
                    result = yield index_1.userService.checkUserExist("user_id", user_id);
                    if (result.error)
                        throw new Error(result.error);
                }
                else if (email) {
                    result = yield index_1.userService.checkUserExist("email", email);
                    if (result.error)
                        throw new Error(result.error);
                }
                else if (name) {
                    result = yield index_1.userService.getUsers("name", name);
                    if (result.error)
                        throw new Error(result.error);
                }
                else {
                    result = yield index_1.userService.getAllUsers();
                    if (result.error)
                        throw new Error(result.error);
                }
                result = index_2.helperFunctions.removeSensitiveData(result);
                res.status(200);
                res.send(result);
            }
            catch (e) {
                configLogger_1.logger.log('error', e.message);
                res.status(404);
                res.send({ error: e.message });
            }
        });
    }
    //handles post user requests
    postUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin_id = req.body.user_id;
                let name = req.body.name;
                let email = req.body.email;
                let title = req.body.title;
                let date_of_birth = req.body.date_of_birth;
                const admin = yield index_1.userService.checkAdminExist("user_id", admin_id);
                if (admin.error) {
                    throw new Error(admin.error);
                }
                const user = yield index_1.userService.checkUserExist("email", email);
                if (user.error === index_2.Errors.INTERNAL_ERROR) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                if (user.user_id) {
                    throw new Error(index_2.Errors.DUPLICATE_EMAIL);
                }
                let user_info = { name, email, title, date_of_birth };
                let result = yield index_1.userService.addUser(user_info);
                if (result.error) {
                    throw new Error(result.error);
                }
                const payload = JSON.stringify({
                    user_id: result.user_id,
                    name: result.name,
                    email: result.email
                });
                res.set("payload", payload);
                res.status(201);
                return next();
            }
            catch (e) {
                configLogger_1.logger.log('error', e.message);
                res.status(400);
                res.send({ error: e.message });
            }
        });
    }
    //handles user login requests
    loginUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let email = req.body.email;
                let password = req.body.password;
                const user = yield index_1.userService.checkUserExist("email", email);
                if (user.error) {
                    throw new Error(user.error);
                }
                const result = yield index_2.helperFunctions.comparePassword(password, user.password);
                if (result.error) {
                    throw new Error(result.error);
                }
                if (!result) {
                    throw new Error(index_2.Errors.USER_PASSWORD_INCORRECT);
                }
                const payload = JSON.stringify({
                    user_id: user.user_id,
                    name: user.name,
                    email: user.email
                });
                res.setHeader("payload", payload);
                res.status(200);
                return next();
            }
            catch (e) {
                configLogger_1.logger.log('error', e.message);
                res.status(400);
                res.send({ error: e.message });
            }
        });
    }
    //handles delete user requests
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin_id = req.body.user_id;
                const email = req.body.email;
                const admin = yield index_1.userService.checkAdminExist("user_id", admin_id);
                if (admin.error) {
                    throw new Error(admin.error);
                }
                const user = yield index_1.userService.checkUserExist("email", email);
                if (user.error) {
                    throw new Error(user.error);
                }
                if (user.roles === "admin") {
                    throw new Error(index_2.Errors.ADMIN_DELETE_ADMIN);
                }
                const result = yield index_1.userService.removeUser({ email });
                if (result.error) {
                    throw new Error(result.error);
                }
                res.status(200);
                res.send(result);
            }
            catch (e) {
                configLogger_1.logger.log('error', e.message);
                res.status(400);
                res.send({ error: e.message });
            }
        });
    }
    //handles update user requests
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.body.user_id;
                let password = req.body.password;
                let title = req.body.title;
                let date_of_birth = req.body.date_of_birth;
                const user = yield index_1.userService.checkUserExist("user_id", user_id);
                if (user.error) {
                    throw new Error(user.error);
                }
                if (user.roles === "admin") {
                    throw new Error(index_2.Errors.ADMIN_EDIT_USER);
                }
                if (!(password || title || date_of_birth)) {
                    throw new Error(index_2.Errors.USER_UPDATE_FIELD_REQUIRED);
                }
                let user_info = { email: user.email, password, title, date_of_birth };
                let result = yield index_1.userService.editUser(user_info);
                if (result.error) {
                    throw new Error(result.error);
                }
                res.status(200);
                res.send(result);
            }
            catch (e) {
                configLogger_1.logger.log('error', e.message);
                res.status(400);
                res.send({ error: e.message });
            }
        });
    }
    //handles get requests for food items consumed by user
    getUserFoodItems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.body.user_id;
                let name = req.query.name;
                let email = req.query.email;
                let sort = req.query.sort;
                const user = yield index_1.userService.checkUserExist("user_id", user_id);
                if (user.error) {
                    throw new Error(user.error);
                }
                let result;
                if (user.roles !== "admin") {
                    if (name) {
                        result = yield index_1.userService.getConsumptionDetails({ food_name: name, email: user.email });
                    }
                    else if (sort) {
                        result = yield index_1.userService.getConsumptionDetailsSorted({ email: user.email }, sort);
                    }
                    else {
                        result = yield index_1.userService.getConsumptionDetails({ email: user.email });
                    }
                }
                else {
                    if (sort) {
                        if (name) {
                            result = yield index_1.userService.getConsumptionDetailsSorted({ food_name: name }, sort);
                        }
                        else if (email) {
                            result = yield index_1.userService.getConsumptionDetailsSorted({ email }, sort);
                        }
                        else {
                            result = yield index_1.userService.getConsumptionDetailsSorted({}, sort);
                        }
                    }
                    else {
                        if (name && email) {
                            result = yield index_1.userService.getConsumptionDetails({ food_name: name, email: email });
                        }
                        else if (name) {
                            result = yield index_1.userService.getConsumptionDetails({ food_name: name });
                        }
                        else if (email) {
                            result = yield index_1.userService.getConsumptionDetails({ email });
                        }
                        else {
                            result = yield index_1.userService.getConsumptionDetails({});
                        }
                    }
                }
                if (result.error) {
                    throw new Error(result.error);
                }
                result = index_2.helperFunctions.removeSensitiveData(result);
                res.status(200);
                res.send({ result });
            }
            catch (e) {
                configLogger_1.logger.log('error', e.message);
                res.status(400);
                res.send({ error: e.message });
            }
        });
    }
    //handles get requests for user consumption details
    getConsumptionDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.body.user_id;
                let name = req.query.name;
                let email = req.query.email;
                let sort = req.query.sort;
                const user = yield index_1.userService.checkUserExist("user_id", user_id);
                if (user.error) {
                    throw new Error(user.error);
                }
                let result;
                if (user.roles === "admin") {
                }
                else {
                    if (sort) {
                        //    result = await userService.getUserConsumptionDetailsSorted({email}, sort);
                    }
                    else {
                        result = yield index_1.userService.getUserConsumptionDetails({ email: user.email });
                    }
                }
                if (result.error) {
                    throw new Error(result.error);
                }
                result = index_2.helperFunctions.removeSensitiveData(result);
                res.status(200);
                res.send({ result });
            }
            catch (e) {
                configLogger_1.logger.log('error', e.message);
                res.status(400);
                res.send({ error: e.message });
            }
        });
    }
    //handles post requests for food items consumed by user
    postUserFoodItems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.body.user_id;
                let name = req.body.name;
                let quantity = req.body.quantity;
                const user = yield index_1.userService.checkUserExist("user_id", user_id);
                if (user.error) {
                    throw new Error(user.error);
                }
                if (user.roles === "admin") {
                    throw new Error(index_2.Errors.ADMIN_CONSUME_FOOD);
                }
                let foodItem = yield index_1.foodItemService.checkFoodItemExist("name", name);
                if (foodItem.error) {
                    throw new Error(foodItem.error);
                }
                if (foodItem.quantity < quantity) {
                    throw new Error(index_2.Errors.FOODITEM_QUANTITY_NOT_AVAILABLE);
                }
                let amount_due = Math.floor((quantity * foodItem.price) * 100) / 100;
                let user_food_info = { food_name: name, email: user.email, quantity, amount_due };
                const result = yield index_1.userService.addUserFoodItem(user_food_info);
                if (result.error) {
                    throw new Error(result.error);
                }
                quantity = foodItem.quantity - quantity;
                const foodItem_result = yield index_1.foodItemService.editFoodItem({ name, quantity });
                if (foodItem_result.error) {
                    configLogger_1.logger.log('error', foodItem_result.error);
                }
                res.status(201);
                res.send(result);
            }
            catch (e) {
                configLogger_1.logger.log('error', e.message);
                res.status(400);
                res.send({ error: e.message });
            }
        });
    }
    //handles delete requests for food items consumed by user
    deleteUserFoodItems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin_id = req.body.user_id;
                const name = req.body.name;
                const email = req.body.email;
                const admin = yield index_1.userService.checkAdminExist("user_id", admin_id);
                if (admin.error) {
                    throw new Error(admin.error);
                }
                let result = yield index_1.userService.removeUserFoodItem({ food_name: name, email });
                if (result.error) {
                    throw new Error(result.error);
                }
                res.status(200);
                res.send(result);
            }
            catch (e) {
                configLogger_1.logger.log('error', e.message);
                res.status(400);
                res.send({ error: e.message });
            }
        });
    }
}
exports.default = UserController;
