import { ObjectId } from "mongoose";

export interface Recipe{
    id:ObjectId,
    name:string,
    ingredients:string,
    instructions:string,
    favorited:boolean,
    createdAt:Date
}
