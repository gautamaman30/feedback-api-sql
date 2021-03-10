/*
    this file creates database connection using typeorm library
    and pg as postgresql database driver library
    also creates schemas for all the entities
*/

import { createConnection, Connection} from "typeorm"
import { Users } from "./user"
import { Technology } from "./technology"
import { Feedback } from "./feedback"

export class ConnectDb{

    private type: any;
    private host: string;
    private port: number;
    private username: string;
    private password: string;
    private database: string;
    private entities: Array<any>;

    constructor({type, host, port, username, password, database}){
        this.type = type;
        this.host = host;
        this.port = port;
        this.username = username;
        this.password = password;
        this.database = database;
        this.entities = [Users, Technology, Feedback];
    }

    async createDatabaseConnection(){
        try{
            let connection: Connection = await createConnection({
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
        } catch(e) {
            console.log(e);
        }
    }
}
