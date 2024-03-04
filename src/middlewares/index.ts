import express from "express"

import {get,merge} from "lodash"

import { getUserBySessionToken } from "../db/users"


export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const sessionToken = req.cookies["Session-auth"];
    if (!sessionToken) {
        return res.sendStatus(403)
    }
    const exisitingUser = await getUserBySessionToken(sessionToken);
    if(!exisitingUser){
        return res.sendStatus(403)
    }

    merge(req, { identity: exisitingUser })

    return next()
  } catch (error) {
    return res.sendStatus(403)
  }
  
}