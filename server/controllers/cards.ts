import jsonWebToken, { JwtPayload } from 'jsonwebtoken';
import { Router, Request, Response } from 'express'
import dotenv from 'dotenv'
import Deck from '../db/models/deck';
import Card from '../db/models/card';
import mongoose from 'mongoose';
import { request } from 'http';

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
})