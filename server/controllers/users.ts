import bcrypt from 'bcrypt'
import { Router } from 'express'
import User from "../db/models/user"

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    passwordHash
  })

  try {
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  }
  
  catch(err) {
    response.status(400).send('Update later')
  }

  
})

export default usersRouter;