"use strict";
/*
    this file handles the authentication middleware ( signing
    and verifying json web tokens )
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../utils/index");
const configEnv_1 = __importDefault(require("../configEnv"));
const configLogger_1 = require("../configLogger");
class AuthMiddleware {
    //sign a new token and send the response, using jsonwebtoken library
    signToken(req, res, next) {
        const signOptions = {
            issuer: configEnv_1.default.JWT_TOKEN_ISSUER,
            expiresIn: configEnv_1.default.JWT_TOKEN_EXPIRES_IN,
            algorithm: configEnv_1.default.JWT_TOKEN_ALGORITHM
        };
        let payload = JSON.parse(res.get("payload"));
        jsonwebtoken_1.default.sign(payload, configEnv_1.default.SECRET_KEY, signOptions, function (err, token) {
            if (err) {
                configLogger_1.logger.log('error', err.message);
                res.status(500);
                res.send({ error: index_1.Errors.INTERNAL_ERROR });
            }
            if (token) {
                configLogger_1.logger.log('info', token);
                res.send({ token });
            }
        });
    }
    /*
        verify the json web token and calls the controller functions,
        using jsonwebtoken library
    */
    verifyToken(req, res, next) {
        let token;
        if (req.headers.authorization) {
            token = req.headers.authorization.split(' ')[1];
        }
        jsonwebtoken_1.default.verify(token, configEnv_1.default.SECRET_KEY, function (err, result) {
            if (err) {
                configLogger_1.logger.log('error', err.message);
                res.status(401);
                res.send({ error: index_1.Errors.AUTHORIZATION_FAILED });
            }
            if (result) {
                req.body.user_id = result.user_id;
                return next();
            }
        });
    }
    //converts all the body parameter keys to lowercase
    checkRequestKeys(req, res, next) {
        let body = req.body;
        for (let key in body) {
            req.body[key.toLowerCase()] = body[key];
        }
        return next();
    }
    //sends a response for all the invalid routes
    handleInvalidRoutes(req, res, Response) {
        configLogger_1.logger.log('info', req.path);
        res.status(400);
        res.send({ error: index_1.Errors.URL_NOT_FOUND });
    }
}
exports.AuthMiddleware = AuthMiddleware;
