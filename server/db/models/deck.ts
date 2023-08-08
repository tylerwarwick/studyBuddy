import mongoose, { Document, Schema } from 'mongoose';
import dotenv from 'dotenv';

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

export interface IDeck extends Document{
    name : string;
}


const deckSchema: Schema  = new mongoose.Schema({
    name: String
})



deckSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id;
      delete returnedObject.__v;
    }
  })

  
const Deck = mongoose.model<IDeck>('Deck', deckSchema, 'decks');
export default Deck;
