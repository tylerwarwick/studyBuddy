import jsonWebToken, { JwtPayload } from 'jsonwebtoken';

import { RequestHandler, Request, Response } from 'express'
import dotenv from 'dotenv'
import User from '../db/models/user';

dotenv.config()


const verifyToken : RequestHandler =  async (request, response, next) => {
    
    //Get auth token
    const authorization = request.get('authorization');

    //Verify that auth token exists
    if (!(authorization && authorization.startsWith('Bearer '))) {
        console.log("No bear")
        return response.status(400).json({error: 'Invalid Token'});
    }

    let decodedToken: JwtPayload;
    const token = authorization.replace('Bearer ', '');
    try {
        decodedToken  = jsonWebToken.verify(token, process.env.SECRET!) as JwtPayload;
    } catch (error) {
        return response.status(401).json({ error: 'token invalid, Try loggin in again' })
    }
  
    if (!decodedToken.id) {
        console.log("Token Broke")
        return response.status(401).json({ error: 'token invalid, Try loggin in again' })
    }


    const user = await User.findById(decodedToken.id)
    if (!user) return response.status(401).json({ error: 'User not found, Try loggin in again' });


    return next(); 
}  

const getUser = async (request : Request) => {

    const token = (request.get('authorization')!).replace('Bearer ', '');
    const decodedToken : JwtPayload = jsonWebToken.verify(token, process.env.SECRET!) as JwtPayload;
    return await User.findById(decodedToken.id);
}

export { verifyToken, getUser};