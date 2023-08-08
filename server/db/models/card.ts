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

export interface ICard extends Document{
    question : string;
    answer : string;
    isKnown : boolean;
    deck: string;
}


const cardSchema: Schema  = new mongoose.Schema({
    question: String,
    answer: String,
    isKnown: Boolean,
    deck: {type: mongoose.Types.ObjectId, ref: 'Deck'}
})



cardSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
    }
  })

  

const Card = mongoose.model<ICard>('Card', cardSchema, 'cards');
export default Card;
