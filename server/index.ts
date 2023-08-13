import express from 'express'
import cors from 'cors'
import loginRouter from './controllers/login';
import deckRouter from './controllers/decks';
import { verifyToken } from './controllers/auth';
import cardRouter from './controllers/cards';
import registerRouter from './controllers/register';



const app = express()
app.use(cors()); 
app.use(express.json())




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