import { getUsers } from "../db/users"
import express,{Request,Response} from "express"

export const getAllUsers=  async(req:Request,res:Response)=>{
try {

    const users = await getUsers()
    res.json(users).status(200).end()

} catch (error) {
    return res.status(400).end()
}
}