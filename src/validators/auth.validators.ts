import { NextFunction, Response } from "express";
import { UserRequest } from "../utils/constants";

export class AuthValidator {

    static isAuthenticated = async (req: UserRequest, res: Response, next: NextFunction) => {
    try{
        const authHeader = req.get('Authorization');
        if (!authHeader) {
            throw { statusCode: 401, message: 'No Auth Header Provided' };
        }
        req.userId = 6;
        next();

    }catch(err:any){
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
    }
}