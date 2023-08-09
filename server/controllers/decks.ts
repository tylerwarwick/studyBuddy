import jsonWebToken, { JwtPayload } from 'jsonwebtoken';
import { Router, Request, Response } from 'express'
import dotenv from 'dotenv'
import User from '../db/models/user';
import Deck from '../db/models/deck';
import Card from '../db/models/card';
import mongoose from 'mongoose';
import { get, request } from 'http';
import { getUser } from './auth';


dotenv.config();


const deckRouter = Router();

//Need to circle back and handle expired token better
deckRouter.post('/', async (request, response) => {
    const { name } = request.body;
    const user = await getUser(request);

    if (!user) return response.status(400).json({Error: "User not found, try logging in again"})
    const deck = new Deck({
        name : name
    })

    const savedDeck = await deck.save()
    user.decks = user.decks.concat(savedDeck._id)
    await user.save()
    response.status(200).json(savedDeck)
})

deckRouter.get('/', async (request, response) => {
   const user = await getUser(request)
   if (!user) return response.status(400).json({Error: "User not found, try logging in again"})
   
   const decks = await Deck.find({ '_id': { $in: user.decks } });
   response.status(200).json(decks);
})

deckRouter.delete('/', async (request, response) => {
    const { deckId } = request.body;
    const user = await getUser(request);
    if (!user) return response.status(400).json({Error: "User not found, try logging in again"});


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

 deckRouter.put('/', async (request, response) => {
    const { newName, deckId } = request.body;

    const deck = await Deck.findByIdAndUpdate(deckId, {name: newName}, {returnOriginal: false})
    response.status(200).json(deck);
 })

export default deckRouter;