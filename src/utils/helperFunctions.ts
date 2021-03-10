/*
    this file contains all the utilities functions,
    to carry out some specific tasks
    e.g. generating random passwords
*/

import bcrypt from "bcrypt"
import {Errors} from "./errorsUtils"

export class HelperFunctions{

    //converts a password and generates a hash, using bcrypt library
    async hashPassword(password){
        try{
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            if(hashedPassword) return hashedPassword;
            throw new Error(Errors.INTERNAL_ERROR);
        } catch(e){
            console.log(e.message);
            return {error: e.message};
        }
    }

    //compares a normal and a hashed password, using bcrypt library
    async comparePassword(password, hashedPassword){
        try{
            const result = await bcrypt.compare(password, hashedPassword);
            console.log(2);
            console.log(result);
            if(result) return true;
            else return false;
        } catch(e){
            console.log(e.message);
            return {error: Errors.INTERNAL_ERROR}
        }
    }

    //converts a string or an array of strings to capitalCase
    capitalizeString(item: string | string[]){
        if(typeof item === "string"){
          return item[0].toUpperCase + item.substring(1);
        }
        return item.map(i => i[0].toUpperCase() + i.substring(1));
     }

    //covnerts an array into a set
    convertArrayToSet(arr){
        let set = new Set();
        for(let i of arr){
          set.add(i);
        }
        return set;
    }

    //generates random id of size 10
    generateId(): string {
        const str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@";
        let id = '';
        while(id.length < 10){
          let tempChar = Math.floor(Math.random()*str.length);
          id += str[tempChar];
        }
        return id;
    }

    /*
        converts string to date format accepted date format is "mm/dd/yyyy"
        with current year greater than 18 years than yyyy
    */
    convertStringToDate(date: string){
        let currentYear = (new Date()).getFullYear();

        let month_date = {1:31, 2: 28 | 29, 3:31, 4:30, 5:31, 6:30, 7:31, 8:31, 9:30, 10:31, 11:30, 12:31};

        let arr = date.split('/');
        let [month, day, year] = [...arr];

        if(parseInt(year) > currentYear-18 ) return null;
        if(parseInt(month) >= 13 ) return null;
        if(parseInt(day) <= 0 || parseInt(day) > month_date[parseInt(month)] ) return null;

        return new Date(parseInt(year),parseInt(month),parseInt(day));
    }

    //converts a date to date with format "yyyy-mm-dd"
    getFormatedDate(date: Date){
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
    }

    //removes sensitive data like password and _id
    removeSensitiveData(data: any) {
        if(data) {
            if(Array.isArray(data)) {
                for(let i of data){
                    if(i.password){
                        delete i.password;
                    }
                    if(i._id){
                        delete i._id;
                    }
                }
            }
            else {
                if(data.password) {
                    delete data.password;
                }
                if(data._id) {
                    delete data._id;
                }
            }
        }
        return data;
    }
}
