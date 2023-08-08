import express from 'express'
import cors from 'cors'
const app = express()
import Card from './db/models/card';
import Deck from './db/models/deck';
import User from './db/models/user';
import usersRouter from './controllers/users'
import loginRouter from './controllers/login';
import deckRouter from './controllers/decks';


app.use(express.json())
app.use(cors())


app.get('/cards', (request, response) => {
  Card.findOne({}).then(cards => {
    response.json(cards);
  }) 
})

app.get('/decks', (request, response) => {
    Deck.findOne({}).then(decks => {
      response.json(decks);
    }) 
  })


//Set middleware for private routes that token must be present for

app.get('/user', (request, response) => {
    User.findOne({}).then(users => {
      response.json(users);
    }) 
})


app.use('/new-user', usersRouter);


app.use('/login', loginRouter);

app.use('/new-deck', deckRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})