"use strict";
/*
    this file creates database connection using typeorm library
    and pg as postgresql database driver library
    also creates schemas for all the entities
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectDb = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
const technology_1 = require("./technology");
const feedback_1 = require("./feedback");
class ConnectDb {
    constructor({ type, host, port, username, password, database }) {
        this.type = type;
        this.host = host;
        this.port = port;
        this.username = username;
        this.password = password;
        this.database = database;
        this.entities = [user_1.Users, technology_1.Technology, feedback_1.Feedback];
    }
    createDatabaseConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let connection = yield typeorm_1.createConnection({
                    type: this.type,
                    host: this.host,
                    port: this.port,
                    username: this.username,
                    password: this.password,
                    database: this.database,
                    entities: this.entities,
                    logging: true
                });
                return connection;
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.ConnectDb = ConnectDb;
