import { NextFunction, Response } from "express";
import { type } from "os";
import { title } from "process";
import { Post } from "../models/post.model";
import { User } from "../models/user.model";
import { UserRequest } from "../utils/constants";
type PostRequestBody = {
    title:string
}
type UserPost ={
    postId:number,
    title:string,
    createdAt:string,
    updatedAt:string,
    creator:{email:string,name:string}
}
export class PostController{
    static createPost = async (req: UserRequest, res: Response, next: NextFunction) => {
        try{
            const body = req.body as PostRequestBody;
            const currentTime = new Date().toISOString();
            const post:Post = new Post(body.title,req.userId,currentTime,currentTime);
            const dbPost = await post.createPost();
            const dbUser = await User.getUserById(req.userId);
            const userPost:UserPost = {postId:dbPost[0].insertId,title:post.title,createdAt:post.createdAt,
                updatedAt:post.updatedAt,creator:{email:dbUser[0][0].email,name:dbUser[0][0].name}}
            res.status(201).json({
                message: 'Post created successfully!',
                post: userPost
            });
        }
        catch(err:any){
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }
        
    }
    static getAllUserPosts = async(req: UserRequest, res: Response, next: NextFunction) =>{
        try{
            const userPostsDb = await Post.getUserPostsById(req.userId);
            const userPosts:UserPost[]=[];
            for(const post of userPostsDb[0]){
               userPosts.push({postId:post.idposts,title:post.title,createdAt:post.createdAt,updatedAt:post.updatedAt,
                creator:{email:post.email,name:post.name}})
            }
            res.status(201).json({
                message: 'Posts fetched successfully!',
                posts:userPosts
            });
        }catch(err:any){
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }
    }
    static updatePost = async (req: UserRequest, res: Response, next: NextFunction) => {
        try{
            const body = req.body as PostRequestBody;
            const postId = +req.params.id;
            await Post.updatePostDb(body.title,postId);
            res.status(201).json({message:'Update success!'})
        }catch(err:any){
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }

        
    }
}