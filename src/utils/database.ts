import { Connection, createPool } from "mysql2/promise";

export class DbConnect{
    private static connection:Connection;
    DbConnect(){}
    // pool created a pool of connection rather than a single connection so that multiple op can be done simul.
    static async connectToDb():Promise<any>{
         return createPool({
            host: 'localhost',
            user: 'root',
            database: 'postsdb',
            password: '987654321'
        });
    }
    static setConnection(connection:Connection){
        this.connection = connection;
    }
    static getConnection():Connection{
     return this.connection;
    }
}