"use strict";
/*
    this file handles the services for all the food items related
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
class FeedbackService {
    //get all the food items
    getAllFoodItems() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield index_1.database.findFoodItems({});
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
    //get all food items with given query and sorted
    getFoodItemsByQuerySorted(query, sort) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (sort) {
                    let result = yield index_1.database.findFoodItemsSorted(query, sort);
                    if (!Array.isArray(result) && result.error) {
                        throw new Error(index_2.Errors.INTERNAL_ERROR);
                    }
                    return result;
                }
                let result = yield index_1.database.findFoodItems(query);
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
    //updates food items
    editFoodItem(foodItem_info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let foodItem = {};
                if (foodItem_info.quantity)
                    foodItem.quantity = foodItem_info.quantity;
                if (foodItem_info.price)
                    foodItem.price = foodItem_info.price;
                if (foodItem_info.details)
                    foodItem.details = foodItem_info.details;
                const result = yield index_1.database.updateFoodItem({ name: foodItem_info.name }, foodItem);
                if (result.error) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                if (result.affected < 1) {
                    throw new Error(index_2.Errors.FOODITEM_NOT_FOUND);
                }
                return { message: index_2.Messages.FOODITEM_UPDATED };
            }
            catch (err) {
                configLogger_1.logger.log('error', err.message);
                return { error: err.message };
            }
        });
    }
    //deletes the food item matching the given name
    removeFoodItem(foodItem_info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield index_1.database.deleteFoodItem({ name: foodItem_info.name });
                if (result.error) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                if (result.affected !== 1) {
                    throw new Error(index_2.Errors.FOODITEM_NOT_FOUND);
                }
                return { message: index_2.Messages.FOODITEM_REMOVED };
            }
            catch (err) {
                configLogger_1.logger.log('error', err.message);
                return { error: err.message };
            }
        });
    }
    //finds if the food item exists given the key and value
    checkFoodItemExist(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let foodItem_info = {};
                foodItem_info[key] = value;
                const result = yield index_1.database.findFoodItem(foodItem_info);
                if (!result) {
                    throw new Error(index_2.Errors.FOODITEM_NOT_FOUND);
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
    //creates a new food item with all the given food item information
    addFoodItem(foodItem_info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let foodItem;
                foodItem = {
                    name: foodItem_info.name,
                    quantity: foodItem_info.quantity,
                    price: foodItem_info.price
                };
                if (foodItem_info)
                    foodItem.details = foodItem_info.details;
                const result = yield index_1.database.insertFoodItem(foodItem);
                if (result.error) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                return { message: index_2.Messages.FOODITEM_CREATED };
            }
            catch (err) {
                configLogger_1.logger.log('error', err.message);
                return { error: err.message };
            }
        });
    }
}
exports.default = FeedbackService;
