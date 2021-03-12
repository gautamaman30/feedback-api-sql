import { Users } from "./user";
import { Technology } from "./technology";
import { Feedback } from "./feedback";
import { FoodItem } from "./foodItem";
import { Consumption } from "./consumption";
export declare class Database {
    findUser(query: any): Promise<Users | {
        error: any;
    } | undefined>;
    findUsers(query: any): Promise<Users[] | {
        error: any;
    }>;
    findUserFoodItem(query: any): Promise<Consumption[] | {
        error: any;
    }>;
    findUserFoodItemSorted(query: any, sortField: any): Promise<any>;
    findTechnologies(query: any): Promise<Technology[] | {
        error: any;
    }>;
    findTechnology(query: any): Promise<Technology | {
        error: any;
    } | undefined>;
    findFeedback(query: any): Promise<Feedback | {
        error: any;
    } | undefined>;
    findFeedbacks(query: any): Promise<Feedback[] | {
        error: any;
    }>;
    findFeedbacksSorted(query: any, sortField: any): Promise<any>;
    findFoodItem(query: any): Promise<FoodItem | {
        error: any;
    } | undefined>;
    findFoodItems(query: any): Promise<FoodItem[] | {
        error: any;
    }>;
    findFoodItemsSorted(query: any, sortField: any): Promise<any>;
    updateUser(filter: any, update: any): Promise<import("typeorm").UpdateResult | {
        error: any;
    }>;
    updateTechnology(filter: any, update: any): Promise<import("typeorm").UpdateResult | {
        error: any;
    }>;
    updateFeedback(filter: any, update: any): Promise<import("typeorm").UpdateResult | {
        error: any;
    }>;
    updateFeedbackCount(filter: any, update: any): Promise<import("typeorm").UpdateResult | {
        error: any;
    }>;
    updateFoodItem(filter: any, update: any): Promise<import("typeorm").UpdateResult | {
        error: any;
    }>;
    insertUser(user_info: any): Promise<import("typeorm").InsertResult | {
        error: any;
    }>;
    insertUserFoodItem(user_foodItem_info: any): Promise<import("typeorm").InsertResult | {
        error: any;
    }>;
    insertTechnology(technology_info: any): Promise<import("typeorm").InsertResult | {
        error: any;
    }>;
    insertFeedback(feedback_info: any): Promise<import("typeorm").InsertResult | {
        error: any;
    }>;
    insertFoodItem(foodItem_info: any): Promise<import("typeorm").InsertResult | {
        error: any;
    }>;
    deleteUser(query: any): Promise<import("typeorm").DeleteResult | {
        error: any;
    }>;
    deleteUserFoodItem(query: any): Promise<import("typeorm").DeleteResult | {
        error: any;
    }>;
    deleteTechnology(query: any): Promise<import("typeorm").DeleteResult | {
        error: any;
    }>;
    deleteFeedback(query: any): Promise<import("typeorm").DeleteResult | {
        error: any;
    }>;
    deleteFoodItem(query: any): Promise<import("typeorm").DeleteResult | {
        error: any;
    }>;
}
