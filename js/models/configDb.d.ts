import { Connection } from "typeorm";
export declare class ConnectDb {
    private type;
    private host;
    private port;
    private username;
    private password;
    private database;
    private entities;
    constructor({ type, host, port, username, password, database }: {
        type: any;
        host: any;
        port: any;
        username: any;
        password: any;
        database: any;
    });
    createDatabaseConnection(): Promise<Connection | undefined>;
}
