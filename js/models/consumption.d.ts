import "reflect-metadata";
import { Users } from "./user";
import { FoodItem } from "./foodItem";
export declare class Consumption {
    id: number;
    user: Users;
    foodItem: FoodItem;
    food_name: any;
    email: any;
    quantity: number;
    amount_due: any;
    consumed_on: any;
}
