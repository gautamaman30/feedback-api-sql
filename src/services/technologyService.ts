import { database } from '../models/index'
import {Errors, Messages, helperFunctions} from '../utils/index'


export default class TechnologyService{


    async getAllTechnologies(){
        try{
            const result: any = await database.findTechnologies({});
            if(result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }
            return result;
        } catch(err) {
            console.log(err);
            return {error: Errors.INTERNAL_ERROR};
        }
    }



    async editTechnology(technology_info: {name: string, details: string}){
        try{
            let filter: any = { name: technology_info.name };
            let updateDoc: any = { details: technology_info.details };

            const result: any = await database.updateTechnology(filter, updateDoc);

            if(result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }
            if(result.matchedCount < 1){
                throw new Error(Errors.TECHNOLOGY_NOT_FOUND);
            }
            return {message: Messages.TECHNOLOGY_UPDATED};
        } catch(err) {
            console.log(err);
            return {error: err.message};
        }
    }


    async removeTechnology(technology_info: {name: string}){

        try{
            const result: any = await database.deleteTechnology({ name: technology_info.name });

            if(result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }
            if(result.deletedCount !== 1){
                throw new Error(Errors.TECHNOLOGY_NOT_FOUND);
            }
            return {message: Messages.TECHNOLOGY_DELETED};
        } catch(err) {
            console.log(err);
            return {error: err.message};
        }
    }



    async checkTechnologyExist(key: string, value: any){
        try{
            let technology_info: any = {};
            technology_info[key] = value;

            const result: any = await database.findTechnology(technology_info);

            if(!result){
                throw new Error(Errors.TECHNOLOGY_NOT_FOUND);
            }
            if(result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }
            return result;
        } catch(err) {
            console.log(err);
            return {error: err.message};
        }
    }


    async addTechnology(technology_info: {name: string, details?: string}){
        try{
            let technology: any;
            technology = {
                technology_id: helperFunctions.generateId(),
                name: technology_info.name,
            }
            if(technology_info.details) technology.details = technology_info.details;

            const result: any = await database.insertTechnology(technology);

            if(result.error || result.insertedCount < 1){
                throw new Error(Errors.INTERNAL_ERROR);
            }

            return {message: Messages.TECHNOLOGY_CREATED};
        } catch(err) {
            console.log(err);
            return {error: err.message};
        }
    }


}
