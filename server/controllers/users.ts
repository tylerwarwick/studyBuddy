import bcrypt from 'bcrypt'
import { Router } from 'express'
import User from "../db/models/user"
import mongoose from 'mongoose';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  //Get username and pw from request
  const { username, password } = request.body

  //Generate hash for password instead storing bare string in db
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  //Create new user with imported user schema
  const user = new User({
    username,
    passwordHash
  })

  //Attempt to save user
  try {
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  }
  
  //Db may spit out not unique error
  catch(err) {
    console.log(err)
    if (err instanceof mongoose.Error.ValidationError){
      response.status(400).json({error: "Username is taken"})
    }

    else response.status(400).json({error: "Issue communicating with server"})
  }
  
})

export default usersRouter;