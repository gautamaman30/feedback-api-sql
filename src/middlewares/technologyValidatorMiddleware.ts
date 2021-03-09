/*
    this file handles the validation for all
    technology related requests,
    using yup library
*/

import {Request, Response, NextFunction} from "express"
import {object, string } from "yup"
import { helperFunctions } from "../utils/index"

export class TechnologyValidator{

    //validates post and update technology requests
    postAndUpdateTechnology(req: Request, res: Response, next: NextFunction){
        let technologySchema = object({
            name: string().required().lowercase().trim().min(3).max(50).matches(/^[a-z]+$/),
            details: string().required().trim().min(4).max(100)
        });

        let technology_info: any = {
            name: req.body.name,
            details: req.body.details
        };

        technologySchema.validate(technology_info)
            .then((result) => {
              req.body.name = result.name;
              req.body.details = result.details;

              return next();
            }).catch(err => {
              console.log(err);
              res.status(400);
              let error = helperFunctions.capitalizeString(err.errors);
              res.send({error});
            })
    }

    //validates delete technology requests
    deleteTechnology(req: Request, res: Response, next: NextFunction){
        let technologySchema = object({
            name: string().required().lowercase().trim().min(3).max(50).matches(/^[a-z]+$/)
        });

        let technology_info: any = {
            name: req.body.name
        };

        technologySchema.validate(technology_info)
            .then((result) => {
              req.body.name = result.name;

              return next();
            }).catch(err => {
              console.log(err);
              res.status(400);
              let error = helperFunctions.capitalizeString(err.errors);
              res.send({error});
            })
    }
}
