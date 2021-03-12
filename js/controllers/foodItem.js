"use strict";
/*
    this file handles the controllers for all the food items related
    actions and interacts with fooditem's services
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
class FoodItemController {
    //handles get food items requests
    getFoodItems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.body.user_id;
                const name = req.query.feedback_id;
                const sort = req.query.sort;
                let foodItems = [];
                if (name) {
                    const foodItem = yield index_1.foodItemService.checkFoodItemExist("name", name);
                    if (foodItem.error) {
                        throw new Error(foodItem.error);
                    }
                    foodItems[0] = foodItem;
                }
                else if (sort) {
                    foodItems = yield index_1.foodItemService.getFoodItemsByQuerySorted({}, sort);
                }
                else {
                    foodItems = yield index_1.foodItemService.getAllFoodItems();
                }
                if (foodItems.error) {
                    throw new Error(foodItems.error);
                }
                foodItems = index_2.helperFunctions.removeSensitiveData(foodItems);
                res.status(200);
                res.send({ foodItems });
            }
            catch (e) {
                configLogger_1.logger.log('error', e.message);
                res.status(400);
                res.send({ error: e.message });
            }
        });
    }
    //handles post user feedbacks requests
    postFoodItems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin_id = req.body.user_id;
                const name = req.body.name;
                const quantity = req.body.quantity;
                const price = req.body.price;
                const details = req.body.details;
                const admin = yield index_1.userService.checkUserExist("user_id", admin_id);
                if (admin.error) {
                    throw new Error(admin.error);
                }
                if (admin.roles !== "admin") {
                    throw new Error(index_2.Errors.USER_POST_FOODITEM);
                }
                const foodItem = yield index_1.foodItemService.checkFoodItemExist("name", name);
                if (foodItem.error === index_2.Errors.INTERNAL_ERROR) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                if (foodItem.name) {
                    throw new Error(index_2.Errors.DUPLICATE_FOODITEM);
                }
                let foodItem_info = { name, quantity, price, details };
                const result = yield index_1.foodItemService.addFoodItem(foodItem_info);
                if (result.error) {
                    throw new Error(result.error);
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
    //handles update food items requests
    updateFoodItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin_id = req.body.user_id;
                const name = req.body.name;
                const quantity = req.body.quantity;
                const price = req.body.price;
                const details = req.body.details;
                const admin = yield index_1.userService.checkUserExist("user_id", admin_id);
                if (admin.error) {
                    throw new Error(admin.error);
                }
                if (admin.roles !== "admin") {
                    throw new Error(index_2.Errors.USER_EDIT_FOODITEM);
                }
                const foodItem = yield index_1.foodItemService.checkFoodItemExist("name", name);
                if (foodItem.error) {
                    throw new Error(foodItem.error);
                }
                const result = yield index_1.foodItemService.editFoodItem({ name, quantity, price, details });
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
    //handles delete food items requests
    deleteFoodItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin_id = req.body.user_id;
                const name = req.body.name;
                const admin = yield index_1.userService.checkAdminExist("user_id", admin_id);
                if (admin.error) {
                    throw new Error(admin.error);
                }
                if (admin.roles !== "admin") {
                    throw new Error(index_2.Errors.USER_DELETE_FOODITEM);
                }
                const foodItem = yield index_1.foodItemService.checkFoodItemExist("name", name);
                if (foodItem.error) {
                    throw new Error(foodItem.error);
                }
                const result = yield index_1.foodItemService.removeFoodItem({ name });
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
exports.default = FoodItemController;
