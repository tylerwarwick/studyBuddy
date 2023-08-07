import bcrypt from 'bcrypt'
import { Router } from 'express'
import User from "../db/models/user"

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
  //Could come back and split up responses for different errors beyond duplicate username
  catch(err) {
    response.status(401).json({error: "Username is taken"})
  }

  
})

export default usersRouter;