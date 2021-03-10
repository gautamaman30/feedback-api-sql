"use strict";
/*
    this file contains all the utilities functions,
    to carry out some specific tasks
    e.g. generating random passwords
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelperFunctions = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const errorsUtils_1 = require("./errorsUtils");
class HelperFunctions {
    //converts a password and generates a hash, using bcrypt library
    hashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const saltRounds = 10;
                const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
                if (hashedPassword)
                    return hashedPassword;
                throw new Error(errorsUtils_1.Errors.INTERNAL_ERROR);
            }
            catch (e) {
                console.log(e.message);
                return { error: e.message };
            }
        });
    }
    //compares a normal and a hashed password, using bcrypt library
    comparePassword(password, hashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield bcrypt_1.default.compare(password, hashedPassword);
                console.log(2);
                console.log(result);
                if (result)
                    return true;
                else
                    return false;
            }
            catch (e) {
                console.log(e.message);
                return { error: errorsUtils_1.Errors.INTERNAL_ERROR };
            }
        });
    }
    //converts a string or an array of strings to capitalCase
    capitalizeString(item) {
        if (typeof item === "string") {
            return item[0].toUpperCase + item.substring(1);
        }
        return item.map(i => i[0].toUpperCase() + i.substring(1));
    }
    //covnerts an array into a set
    convertArrayToSet(arr) {
        let set = new Set();
        for (let i of arr) {
            set.add(i);
        }
        return set;
    }
    //generates random id of size 10
    generateId() {
        const str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@";
        let id = '';
        while (id.length < 10) {
            let tempChar = Math.floor(Math.random() * str.length);
            id += str[tempChar];
        }
        return id;
    }
    /*
        converts string to date format accepted date format is "mm/dd/yyyy"
        with current year greater than 18 years than yyyy
    */
    convertStringToDate(date) {
        let currentYear = (new Date()).getFullYear();
        let month_date = { 1: 31, 2: 28 | 29, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31 };
        let arr = date.split('/');
        let [month, day, year] = [...arr];
        if (parseInt(year) > currentYear - 18)
            return null;
        if (parseInt(month) >= 13)
            return null;
        if (parseInt(day) <= 0 || parseInt(day) > month_date[parseInt(month)])
            return null;
        return new Date(parseInt(year), parseInt(month), parseInt(day));
    }
    //converts a date to date with format "yyyy-mm-dd"
    getFormatedDate(date) {
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
    }
    //removes sensitive data like password and _id
    removeSensitiveData(data) {
        if (data) {
            if (Array.isArray(data)) {
                for (let i of data) {
                    if (i.password) {
                        delete i.password;
                    }
                    if (i._id) {
                        delete i._id;
                    }
                }
            }
            else {
                if (data.password) {
                    delete data.password;
                }
                if (data._id) {
                    delete data._id;
                }
            }
        }
        return data;
    }
}
exports.HelperFunctions = HelperFunctions;
