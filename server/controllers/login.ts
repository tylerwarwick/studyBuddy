import jsonWebToken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Router } from 'express'
import dotenv from 'dotenv'
import User from "../db/models/user"

dotenv.config();


const loginRouter = Router();

loginRouter.post('/', async (request, response) => {
    //Get username and password from api call
    const { username, password } = request.body
  
    //Find user with matching username
    const user = await User.findOne({ username })
    
    //If the user is found, compare their pw with the pw in the request
    const passwordCorrect = (user === null)
      ? false
      : await bcrypt.compare(password, user.passwordHash)
  
    //If either username or pw is wrong, throw back 401 error
    if (!(user && passwordCorrect)) {
      return response.status(400).json({
        error: 'invalid username or password'
      })
    }
    
    
    const userForToken = {
      username: user.username,
      id: user._id,
    }
    
    //Generate token
    //Expires in 2 hours
    const token = jsonWebToken.sign(
        userForToken, 
        process.env.SECRET!,
        {expiresIn: 60 * 60 * 2})
    
    //By this point the username and pw have been verified
    //Respond with 200 response code and token for frontend
    response
      .status(200)
      .send({ token, username: user.username})
  })

export default loginRouter;