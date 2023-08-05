import mongoose, { Document, Schema } from 'mongoose';
import * as dotenv from "dotenv";

dotenv.config();

const url = 'mongodb+srv://tylerwarwicksignup:CHnJsFpxGdp9bJt5@cluster0.egmbsoi.mongodb.net/StudyBuddy?retryWrites=true&w=majority';
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
}


const cardSchema: Schema  = new mongoose.Schema({
    question: String,
    answer: String,
    isKnown: Boolean
})



cardSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
    }
  })

  

const Card = mongoose.model<ICard>('Card', cardSchema, 'cards');
export default Card;
