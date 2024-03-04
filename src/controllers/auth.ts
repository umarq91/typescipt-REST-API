import { createUser, getUserByEmail } from "../db/users";
import express,{Request,Response} from "express";
import { UserModel } from "../db/users";
import { comparePassword, generateAuthToken, hashPassword } from "../helpers/auth.index";
import bcrypt from "bcrypt"
export const login = async(req:Request, res:Response)=>{
try {
    const {email,password} = req.body;

   const user = await getUserByEmail(email).select("+authentication.password")

    if(!user){
        return res.sendStatus(401).end()
    }

    const isPasswordValid = comparePassword(password, user.authentication.password);

    if (!isPasswordValid) {
        return res.sendStatus(401).end(); // Unauthorized
    }

    user.authentication.sessionToken = generateAuthToken(user.id)

    await user.save()

    res.cookie("Session-auth", user.authentication.sessionToken, { domain: "localhost", httpOnly: true });

    return res.status(200).json(user).end();

} catch (error) {
    console.log(error);
    
    return res.status(400).json(error).end()
}

}
export const register = async(req:express.Request, res:express.Response)=>{
try {

    const {username,email,password} = req.body;

    if(!username || !email || !password){
        return res.status(400)
    }

    const existingUser =await getUserByEmail(email)
    if (existingUser) {
      return  res.status(400).json({ message: "User already exists" })
    } 

    const hashedPassword = await hashPassword(password)

    const user = await createUser({
        username,
        email,
        authentication: {
            password: hashedPassword
        }
    })


    return res.json(user).status(200).end()

    
} catch (error) {
    console.log(error);
    return res.status(400).json(error).end()
    
    
}
}