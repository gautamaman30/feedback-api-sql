export default class FeedbackService {
    getAllFoodItems(): Promise<import("../models/foodItem").FoodItem[] | {
        error: any;
    }>;
    getFoodItemsByQuerySorted(query: any, sort?: any): Promise<any>;
    editFoodItem(foodItem_info: {
        name: string;
        quantity?: number;
        price?: number;
        details?: string;
    }): Promise<{
        message: string;
        error?: undefined;
    } | {
        error: any;
        message?: undefined;
    }>;
    removeFoodItem(foodItem_info: {
        name: string;
    }): Promise<{
        message: string;
        error?: undefined;
    } | {
        error: any;
        message?: undefined;
    }>;
    checkFoodItemExist(key: string, value: any): Promise<any>;
    addFoodItem(foodItem_info: {
        name: string;
        quantity: number;
        price: number;
        details?: string;
    }): Promise<{
        message: string;
        error?: undefined;
    } | {
        error: any;
        message?: undefined;
    }>;
}
