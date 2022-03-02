import { DbConnect } from "../utils/database"
export class User{
    constructor(private email:string,private password:string,private name:string) {}

     addUserDb = ():Promise<any>=>{
       return DbConnect.getConnection().execute('INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
       [this.email,this.password,this.name]);
    }
    static getUserById = (id:number):Promise<any> =>{
      return DbConnect.getConnection().execute('select * from users WHERE idusers=?',
       [id]);
    }
    static deleteUserDb = (id:number):Promise<any> =>{
      return DbConnect.getConnection().execute('DELETE FROM users WHERE idusers=?',
      [id]);
    }
    }