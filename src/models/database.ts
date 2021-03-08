import { getRepository } from "typeorm"
import { Users } from "./user"
import { Technology } from "./technology"
import { Feedback } from "./feedback"


export class Database{

    async findUser(query){
        try{
            const result = await getRepository(Users)
                .findOne(query);
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async findUsers(query){
        try{
            const result = await getRepository(Users)
                .find(query);
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async findTechnologies(query){
        try{
            const result = await getRepository(Technology)
                .find(query);
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async findTechnology(query){
        try{
            const result = await getRepository(Technology)
                .findOne(query);
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async findFeedback(query){
        try{
            const result = await getRepository(Feedback)
                .findOne(query);
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async findFeedbacks(query){
        try{
            const result = await getRepository(Feedback)
                .find(query);
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async findFeedbacksSorted(query, sortField) {
        try{
            let result: any;
            if(Object.keys(query).length === 0) {
                result = await getRepository(Feedback)
                    .createQueryBuilder("feedback")
                    .orderBy(`feedback.${sortField}`,"DESC")
                    .getMany();
            }
            else {
                const key: any = Object.keys(query)[0];
                result = await getRepository(Feedback)
                    .createQueryBuilder("feedback")
                    .where(`feedback.${key} = :${key}`, query)
                    .orderBy(`feedback.${sortField}`,"DESC")
                    .getMany();
            }
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async updateUser(filter, update){
        try{
            const result = await getRepository(Users)
                .update(filter, update);
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async updateTechnology(filter, update){
        try{
            const result = await getRepository(Technology)
                .update(filter, update);
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async updateFeedback(filter, update){
        try{
            const result = await getRepository(Feedback)
                .update(filter, update);
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async updateFeedbackCount(filter, update){
        try{
            const result = await getRepository(Feedback)
                .createQueryBuilder("feedback")
                .update(Feedback)
                .set({count: () => "count + 1"})
                .where("feedback_id = :feedback_id",filter)
                .execute();
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async insertUser(user_info){
        try{
            const result = await getRepository(Users)
                .insert(user_info);
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async insertTechnology(technology_info){
        try{
            const result = await getRepository(Technology)
                .insert(technology_info);
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async insertFeedback(feedback_info){
        try{
            const result = await getRepository(Feedback)
                .insert(feedback_info);
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async deleteUser(query){
        try{
            const result = await getRepository(Users)
                .delete(query);
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async deleteTechnology(query){
        try{
            const result = await getRepository(Technology)
                .delete(query);
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async deleteFeedback(query){
        try{
            const result = await getRepository(Feedback)
                .delete(query);
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }
}
