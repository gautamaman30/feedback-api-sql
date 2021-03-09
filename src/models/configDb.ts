import { createConnection, Connection} from "typeorm"
import { Users } from "./user"
import { Technology } from "./technology"
import { Feedback } from "./feedback"


export class ConnectDb{

    private type: any;
    private host: any;
    private port: any;
    private username: any;
    private password: any;
    private database: any;
    private entities: any;

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
//                synchronize: true,
                logging: true
            });
            return connection;
        } catch(e) {
            console.log(e);
        }
    }
}
