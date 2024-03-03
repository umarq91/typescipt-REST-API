import { createUser, getUserByEmail } from "db/users";
import express from "express";
import { UserModel } from "db/users";
import { hashPassword } from "helpers/auth.index";
export const register = async(req:express.Request, res:express.Response)=>{
try {

    const {username,email,password} = req.body();

    if(!username || !email || !password){
        return res.status(400)
    }

    const existingUser = getUserByEmail(email)
    if (existingUser) return res.status(400).json({ message: "User already exists" })

    const hashedPassword = await hashPassword(password)

    const user = await createUser({
        username,
        email,
        authentication: {
            password: hashedPassword
        }
    })


    return res.json("Successfully created").status(200).end()

    
} catch (error) {
    console.log(error);
    return res.status(400)
    
    
}
}