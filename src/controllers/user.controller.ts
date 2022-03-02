import { NextFunction, Response } from "express";
import { User } from "../models/user.model";
import { UserRequest } from "../utils/constants";
type PostRequestBody = {
    email:string,
    password:string,
    name:string
}
export class UserController{
    static createUser = async (req: UserRequest, res: Response, next: NextFunction) => {
        try{
            const body = req.body as PostRequestBody;
            const user = new User(body.email,body.password,body.name);
            await user.addUserDb();
            res.status(201).json({
                message: 'User created successfully!'
            });
        }
        catch(err:any){
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }
        
    }

    static deleteUser = async (req: UserRequest, res: Response, next: NextFunction) => {
        try{
            await User.deleteUserDb(req.userId);
            res.status(200).json({
                message: 'Deleted User successfully!'
            });
        }
        catch(err:any){
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }
        
    }
}