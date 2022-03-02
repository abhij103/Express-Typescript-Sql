import express, { json, NextFunction, Request, Response, urlencoded } from 'express';
import cors from 'cors';
import { DbConnect } from './utils/database';
import { UserRequest } from './utils/constants';
import { postRoutes } from './routes/posts.route';
import { userRoutes } from './routes/users.route';
const app = express();
app.use(cors());
app.use(json());
app.use(urlencoded({extended:false}));
app.use('/user',userRoutes)
app.use('/post', postRoutes);

app.use((error:any, req:UserRequest, res:Response, next:NextFunction) => { //will only come here when error occursss.
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
  });
 const main = async()=> {
     try{
       const connection = await DbConnect.connectToDb();
       DbConnect.setConnection(connection);
       app.listen(process.env.PORT || 3000,()=>{
        console.log('running on 3000');
    });
     }catch(err){
        console.log('Error connecting to Database');
     }
}

main();//start
