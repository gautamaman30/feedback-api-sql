import { Users } from "./user";
import { Technology } from "./technology";
import { Feedback } from "./feedback";
export declare class Database {
    findUser(query: any): Promise<Users | {
        error: any;
    } | undefined>;
    findUsers(query: any): Promise<Users[] | {
        error: any;
    }>;
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
    insertUser(user_info: any): Promise<import("typeorm").InsertResult | {
        error: any;
    }>;
    insertTechnology(technology_info: any): Promise<import("typeorm").InsertResult | {
        error: any;
    }>;
    insertFeedback(feedback_info: any): Promise<import("typeorm").InsertResult | {
        error: any;
    }>;
    deleteUser(query: any): Promise<import("typeorm").DeleteResult | {
        error: any;
    }>;
    deleteTechnology(query: any): Promise<import("typeorm").DeleteResult | {
        error: any;
    }>;
    deleteFeedback(query: any): Promise<import("typeorm").DeleteResult | {
        error: any;
    }>;
}
