/*
    this file handles the authentication middleware ( signing
    and verifying json web tokens )
*/

import { Request, Response, NextFunction} from "express"
import jwt, { Secret } from "jsonwebtoken"
import { Errors } from "../utils/index"
import configObj from "../configEnv"
import {logger} from "../configLogger"

export class AuthMiddleware{

    //sign a new token and send the response, using jsonwebtoken library
    signToken(req: Request, res: Response, next: NextFunction){
        const signOptions: any = {
            issuer: configObj.JWT_TOKEN_ISSUER,
            expiresIn: configObj.JWT_TOKEN_EXPIRES_IN,
            algorithm: configObj.JWT_TOKEN_ALGORITHM
        }

        let payload = JSON.parse(res.get("payload"));

        jwt.sign(payload, <Secret>configObj.SECRET_KEY , signOptions , function(err, token) {
            if(err){
                logger.log('error', err.message);
                res.status(500);
                res.send({error: Errors.INTERNAL_ERROR});
            }
            if(token){
                logger.log('info', token);
                res.send({token});
            }
        });
    }

    /*
        verify the json web token and calls the controller functions,
        using jsonwebtoken library
    */
    verifyToken(req: Request, res: Response, next: NextFunction){

        let token;
        if(req.headers.authorization){
            token = req.headers.authorization.split(' ')[1];
        }

        jwt.verify(token, <Secret>configObj.SECRET_KEY, function(err, result) {
            if(err){
                logger.log('error', err.message);
                res.status(401);
                res.send({error: Errors.AUTHORIZATION_FAILED});
            }
            if(result){
                req.body.user_id = result.user_id;
                return next();
            }
        });
    }

    //converts all the body parameter keys to lowercase
    checkRequestKeys(req: Request, res: Response, next: NextFunction){
        let body = req.body;
        for(let key in body){
            req.body[key.toLowerCase()] = body[key];
        }
        return next();
    }

    //sends a response for all the invalid routes
    handleInvalidRoutes(req: Request, res, Response) {
        logger.log('info', req.path);
        res.status(400);
        res.send({error: Errors.URL_NOT_FOUND});
    }
}
