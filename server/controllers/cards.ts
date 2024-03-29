import { Router } from 'express'
import dotenv from 'dotenv'
import Card from '../db/models/card';
import mongoose from 'mongoose';


dotenv.config();

const cardRouter = Router();

cardRouter.post('/', async (request, response) => {
    const { question, answer, deckId } = request.body;

    const card = new Card({
        question : question,
        answer : answer,
        isKnown : false,
        deck : new mongoose.Types.ObjectId(deckId)
    })

    await card.save();
    return response.status(200).json(card)
})

cardRouter.get('/:deckId', async (request, response) => {
    const deckId = request.params.deckId;
    const cards = await Card.find({deck: new mongoose.Types.ObjectId(deckId)})
    return response.status(200).json(cards)
})

cardRouter.delete('/', async (request, response) => {  
    const { cardId } = request.body;

    await Card.findByIdAndDelete(cardId);
    return response.status(204).json({})
})

cardRouter.put('/', async (request, response) => {
    const { question, answer, isKnown, cardId  } = request.body;

    const card = await Card.findByIdAndUpdate(cardId, 
        {question: question, answer: answer, isKnown: isKnown}, 
        {returnOriginal: false});

    return response.status(200).json(card)
})

cardRouter.put('/reset-Deck', async (request, response) => {
    const { deckId } = request.body;

    //Reset all cards to unknown from that deck
    const cards = await Card.updateMany(
        {deck : deckId}, 
        {isKnown: false}, 
        {returnOriginal: false}
        );

    
    return response.status(200).json(cards)
})

export default cardRouter;