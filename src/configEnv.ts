/*
    this file checks server mode (development, staging and production)
    and loads the environment file depending on the server mode
*/
import { join } from "path"
import dotenv from "dotenv"

//loading .env file
dotenv.config({
    path: join(process.cwd(), `${process.env.NODE_ENV}.env`)
})

//object storing environment variables
const configObj = {
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    SECRET_KEY: process.env.SECRET_KEY,
    JWT_TOKEN_ISSUER: process.env.JWT_TOKEN_ISSUER,
    JWT_TOKEN_EXPIRES_IN: process.env.JWT_TOKEN_EXPIRES_IN,
    JWT_TOKEN_ALGORITHM: process.env.JWT_TOKEN_ALGORITHM,
    DB_TYPE: process.env.DB_TYPE,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE
}

export default configObj;
