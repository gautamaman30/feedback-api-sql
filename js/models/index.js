"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const configDb_1 = require("./configDb");
const configEnv_1 = __importDefault(require("../configEnv"));
const errorsUtils_1 = require("../utils/errorsUtils");
const messagesUtils_1 = require("../utils/messagesUtils");
const database_1 = require("./database");
const configLogger_1 = require("../configLogger");
//creates an instance of database connection file
const connectionInstance = new configDb_1.ConnectDb({
    type: configEnv_1.default.DB_TYPE,
    host: configEnv_1.default.DB_HOST,
    port: configEnv_1.default.DB_PORT,
    username: configEnv_1.default.DB_USERNAME,
    password: configEnv_1.default.DB_PASSWORD,
    database: configEnv_1.default.DB_DATABASE
});
//creates the database connectedion
(function () {
    connectionInstance.createDatabaseConnection()
        .then(connection => {
        configLogger_1.logger.log('info', messagesUtils_1.Messages.DATABASE_CONNECTED);
    }).catch(e => {
        configLogger_1.logger.log('error', errorsUtils_1.Errors.DATABASE_CONNECTION_FAILED);
    });
})();
const database = new database_1.Database();
exports.database = database;
