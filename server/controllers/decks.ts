import jsonWebToken, { JwtPayload } from 'jsonwebtoken';
import { Router, Request, Response } from 'express'
import dotenv from 'dotenv'
import User from '../db/models/user';
import Deck from '../db/models/deck';
import Card from '../db/models/card';
import mongoose from 'mongoose';


dotenv.config();


const deckRouter = Router();

//Need to circle back and handle expired token better
deckRouter.post('/', async (request, response) => {
   
    const authorization = request.get('authorization');

    if (!(authorization && authorization.startsWith('Bearer '))) {
        return response.status(400).json({error: 'Invalid Token'});
    }
    
    const token = authorization.replace('Bearer ', '')

      
    
    const { name } = request.body;
    const decodedToken : JwtPayload = jsonWebToken.verify(token, process.env.SECRET!) as JwtPayload;
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid, Try loggin in again' })
    }


    const user = await User.findById(decodedToken.id)
    if (!user) return response.status(401).json({ error: 'token invalid, Try loggin in again' })
    
    const deck = new Deck({
        name : name
    })

    const savedDeck = await deck.save()
    user.decks = user.decks.concat(savedDeck._id)
    await user.save()
    response.json(savedDeck)
})

deckRouter.get('/', async (request, response) => {
   //Get auth token
   const authorization = request.get('authorization');

   //Verify that auth token exists
   if (!(authorization && authorization.startsWith('Bearer '))) {
       return response.status(400).json({error: 'Invalid Token'});
   }
   
   //Need better way to verify it hasn't expired
   const token = authorization.replace('Bearer ', '');
   const decodedToken : JwtPayload = jsonWebToken.verify(token, process.env.SECRET!) as JwtPayload;
   if (!decodedToken.id) {
       return response.status(401).json({ error: 'token invalid, Try loggin in again' })
   }


   const user = await User.findById(decodedToken.id)
   if (!user) return response.status(401).json({ error: 'token invalid, Try loggin in again' })
   
   const decks = await Deck.find({ '_id': { $in: user.decks } });
   response.status(200).json(decks);
})

deckRouter.delete('/', async (request, response) => {
    //Get auth token
    const authorization = request.get('authorization');
 
    //Verify that auth token exists
    if (!(authorization && authorization.startsWith('Bearer '))) {
        return response.status(400).json({error: 'Invalid Token'});
    }
    
    //Need better way to verify it hasn't expired
    const token = authorization.replace('Bearer ', '');
    const decodedToken : JwtPayload = jsonWebToken.verify(token, process.env.SECRET!) as JwtPayload;
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid, Try loggin in again' })
    }
 
 
    const user = await User.findById(decodedToken.id)
    if (!user) return response.status(401).json({ error: 'token invalid, Try loggin in again' })

    const { deckId } = request.body;

    //Delete deck objectId from user "decks" array
    if (user.decks.includes(deckId)) user.decks.splice(user.decks.indexOf(deckId), 1);
    await user.save();

    //Delete actual deck document
    await Deck.findByIdAndDelete(deckId);

    //Delete all cards from that deck
    const cards = await Card.find({deck : deckId});
    
    await Card.deleteMany({deck : deckId})

    response.status(204).json({})
 })

export default deckRouter;