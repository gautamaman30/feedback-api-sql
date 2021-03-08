"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const configDb_1 = require("./configDb");
const config_1 = __importDefault(require("../config"));
const errorsUtils_1 = require("../utils/errorsUtils");
const messagesUtils_1 = require("../utils/messagesUtils");
const database_1 = require("./database");
const connectionInstance = new configDb_1.ConnectDb({
    type: config_1.default.DB_TYPE,
    host: config_1.default.DB_HOST,
    port: config_1.default.DB_PORT,
    username: config_1.default.DB_USERNAME,
    password: config_1.default.DB_PASSWORD,
    database: config_1.default.DB_DATABASE
});
(function () {
    connectionInstance.createDatabaseConnection()
        .then(connection => {
        console.log(messagesUtils_1.Messages.DATABASE_CONNECTED);
    }).catch(e => {
        console.log(errorsUtils_1.Errors.DATABASE_CONNECTION_FAILED);
    });
})();
const database = new database_1.Database();
exports.database = database;
