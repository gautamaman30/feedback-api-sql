export declare class HelperFunctions {
    hashPassword(password: any): Promise<any>;
    comparePassword(password: any, hashedPassword: any): Promise<boolean | {
        error: string;
    }>;
    capitalizeString(item: string | string[]): string | string[];
    convertArrayToSet(arr: any): Set<unknown>;
    generateId(): string;
    convertStringToDate(date: string): Date | null;
    getFormatedDate(date: Date): string;
    removeSensitiveData(data: any): any;
}
