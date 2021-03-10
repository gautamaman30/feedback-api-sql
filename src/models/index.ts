import { ConnectDb } from "./configDb"
import configObj from "../configEnv"
import { Errors } from "../utils/errorsUtils"
import { Messages } from "../utils/messagesUtils"
import { Database } from "./database"
import {logger} from "../configLogger"

//creates an instance of database connection file
const connectionInstance = new ConnectDb({
    type: configObj.DB_TYPE,
    host: configObj.DB_HOST,
    port: configObj.DB_PORT,
    username: configObj.DB_USERNAME,
    password: configObj.DB_PASSWORD,
    database: configObj.DB_DATABASE
});

//creates the database connectedion
(function(){
    connectionInstance.createDatabaseConnection()
        .then( connection => {
            logger.log('info', Messages.DATABASE_CONNECTED);
        }).catch(e => {
            logger.log('error', Errors.DATABASE_CONNECTION_FAILED);
        });
})();

const database = new Database();
export {database};
