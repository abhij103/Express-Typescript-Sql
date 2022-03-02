import { DbConnect } from "../utils/database"
export class Post{
    constructor(public title:string,public creator:number , public createdAt:string , public updatedAt:string) {}

     createPost = ():Promise<any>=>{
       return DbConnect.getConnection().execute('INSERT INTO posts (title, idusers, createdAt, updatedAt) VALUES (?, ?, ?, ?)',
       [this.title, this.creator, this.createdAt, this.updatedAt]);
    }
    static getUserPostsById = (id:number):Promise<any>=>{
        //CC directly joining and then selecting whe we have a large db, therefor first filter each table and then join.
      //   return DbConnect.getConnection().execute(`SELECT * from users NATURAL JOIN posts WHERE idusers=?`,[id]);
        return DbConnect.getConnection()
        .execute(`SELECT * from ((select * from users WHERE idusers=?) AS u
        NATURAL JOIN (select * from posts  WHERE idusers=?) AS p)`,[id,id]);
      }
      static updatePostDb = (title:string,id:number):Promise<any> => {
          return DbConnect.getConnection().execute('UPDATE posts SET title=? ,updatedAt=? WHERE idposts=?',
          [title,new Date().toISOString(),id]);
      }

    }