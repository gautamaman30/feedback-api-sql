import "reflect-metadata";
declare type roles_structure = 'admin' | 'employee';
export declare class Users {
    user_id: string;
    name: string;
    email: string;
    password: string;
    roles: roles_structure;
    title: string;
    date_of_birth: any;
}
export {};
