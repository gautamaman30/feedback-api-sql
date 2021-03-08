import { ConnectDb } from "./configDb"
import configObj from "../config"
import { Errors } from "../utils/errorsUtils"
import { Messages } from "../utils/messagesUtils"
import { Database } from "./database"


const connectionInstance = new ConnectDb({
    type: configObj.DB_TYPE,
    host: configObj.DB_HOST,
    port: configObj.DB_PORT,
    username: configObj.DB_USERNAME,
    password: configObj.DB_PASSWORD,
    database: configObj.DB_DATABASE
});



(function(){
    connectionInstance.createDatabaseConnection()
        .then( connection => {
            console.log(Messages.DATABASE_CONNECTED);
        }).catch(e => {
            console.log(Errors.DATABASE_CONNECTION_FAILED);
        });
})();



const database = new Database();
export {database};
