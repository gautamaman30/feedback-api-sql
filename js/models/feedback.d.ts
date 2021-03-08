import "reflect-metadata";
declare type entity_structure = 'user' | 'technology';
declare type status_structure = 'waiting' | 'approved' | 'rejected';
export declare class Feedback {
    feedback_id: string;
    name: string;
    feedback: string;
    posted_by: string;
    entity: entity_structure;
    entity_id: string;
    status: status_structure;
    created_on: any;
    count: number;
}
export {};
