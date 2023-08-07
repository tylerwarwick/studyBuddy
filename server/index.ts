import express from 'express'
import cors from 'cors'
const app = express()
import Card from './db/models/card';
import Deck from './db/models/deck';
import User from './db/models/user';
import usersRouter from './controllers/users'
import loginRouter from './controllers/login';


app.use(express.json())

//Setting up cors
app.use(cors())


const cards = 
  {
      
      "science" : 
          [
              {
                  "id" : 1,
                  "question" : "What is the powerhouse of the cell?",
                  "answer" : "Mitochondria",
                  "isKnown" : false
              },
              {
                  "id" : 2,
                  "question": "What makes plant cells unique?",
                  "answer": "Plant cells have a vacuole to maintain turgor pressure",
                  "isKnown": false
              },
              {
                  "id" : 3,
                  "question" : "Do my balls itch?",
                  "answer" : "Yes",
                  "isKnown": false
              },
              {
                  "id" : 4,
                  "question" : "How old are you?",
                  "answer" : "12",
                  "isKnown" : false
              },
              {
                  "id" : 5,
                  "question": "Does your mom love you?",
                  "answer": "No",
                  "isKnown": false
              },
              {
                  "id" : 6,
                  "question" : "Does my gooch itch?",
                  "answer" : "Affirmative",
                  "isKnown": true
              }
          ],

      "geography" : 
          [
              {
                  "id" : 1,
                  "question" : "How often do you think people need to do things for it to become habit?",
                  "answer" : "Who tf knows",
                  "isKnown" : false
              },
              {
                  "id" : 2,
                  "question": "Hello?",
                  "answer": "Get out nerd",
                  "isKnown": false
              },
              {
                  "id" : 3,
                  "question" : "Who's the best?",
                  "answer" : "Erin",
                  "isKnown": false
              },
              {
                  "id" : 4,
                  "question" : "Please help ahhhhhhh",
                  "answer" : "hehhehe",
                  "isKnown" : false
              },
              {
                  "id" : 5,
                  "question": "Wtf?",
                  "answer": "No u",
                  "isKnown": false
              },
              {
                  "id" : 6,
                  "question" : "Wa wa wa?",
                  "answer" : "Skeet",
                  "isKnown": true
              },
              {
                  "id" : 7,
                  "question": "AOTY?",
                  "answer": "Pink Tape",
                  "isKnown": false
              }      
          ],
      
      "art" : 
          [
              {
                  "id" : 1,
                  "question" : "Who's gonna carry the boats?",
                  "answer" : "I am",
                  "isKnown": true
              },
              {
                  "id" : 2,
                  "question" : "I need a really long question, like really really long. Can you fill that obligation for me stink rabbit rjbfurbfrubfrubfrufbrubfrubfrubfrubfurbfurc urnurviturvbrtiuvbtruivurtbviuiutrviubvuibvtubirtuirv?",
                  "answer" : "Who tf knows",
                  "isKnown" : false
              },
              {
                  "id" : 3,
                  "question": "Who?",
                  "answer": "poo",
                  "isKnown": false
              },
              {
                  "id" : 4,
                  "question" : "What's the time Mr. Wolf?",
                  "answer" : "4 o clock",
                  "isKnown": false
              },
              {
                  "id" : 5,
                  "question" : "Second last question",
                  "answer" : "yes",
                  "isKnown" : false
              },
              {
                  "id" : 6,
                  "question": "Ra?",
                  "answer": "Gah",
                  "isKnown": false
              }
          ]
  }


app.get('/', (request, response) => {
  response.json(cards);
})


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

app.get('/user', (request, response) => {
    User.findOne({}).then(users => {
      response.json(users);
    }) 
})


app.use('/new-user', usersRouter);


app.use('/login', loginRouter);



const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})