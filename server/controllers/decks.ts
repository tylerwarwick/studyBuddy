import jsonWebToken, { JwtPayload } from 'jsonwebtoken';
import { Router } from 'express'
import dotenv from 'dotenv'
import User from '../db/models/user';
import Deck from '../db/models/deck';


dotenv.config();


const deckRouter = Router();

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

export default deckRouter;