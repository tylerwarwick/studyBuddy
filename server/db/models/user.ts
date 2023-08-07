import mongoose, { Document, Schema } from 'mongoose';
import dotenv from 'dotenv';
import uniqueValidator from 'mongoose-unique-validator'

dotenv.config();
const url = process.env.MONGODB_URI!;


mongoose.set('strictQuery',false);

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  });

export interface IUser extends Document{
    id : string;
    username : string;
    passwordHash : string;
    decks : string[];
}


const userSchema: Schema  = new mongoose.Schema({
    username : {type: String, unique : true},
    passwordHash : String,
    decks : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Deck'
        }
    ]
})

userSchema.plugin(uniqueValidator, { message: 'Username already exists' })

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      returnedObject.decks = returnedObject.decks.map((deck : mongoose.Schema.Types.ObjectId) => {
        return deck.toString();
      })

      delete returnedObject._id
    }
  })


const User = mongoose.model<IUser>('User', userSchema, 'users');
export default User;
