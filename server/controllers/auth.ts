import jsonWebToken from 'jsonwebtoken';

import { Router, Request } from 'express'
import dotenv from 'dotenv'




const getTokenFrom = (request : Request) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.replace('Bearer ', '')
    }
    return null
  }


