import express from 'express'
import cors from 'cors'
import loginRouter from './controllers/login';
import deckRouter from './controllers/decks';
import { verifyToken } from './controllers/auth';
import cardRouter from './controllers/cards';
import registerRouter from './controllers/register';
import RateLimit from "express-rate-limit"


const app = express()
app.use(cors({
  origin: 'https://studybuddy-q2tg.onrender.com/'
})); 
app.use(express.json())


// Set up rate limiter: maximum of twenty requests per minute
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
});
// Apply rate limiter to all requests
app.use(limiter);



//Login and registration is allowed without token (obviously)
app.use('/register', registerRouter);
app.use('/login', loginRouter);

//Everything beyond is token verified  
app.use(verifyToken);
 
app.use('/deck', deckRouter);
app.use('/card', cardRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})