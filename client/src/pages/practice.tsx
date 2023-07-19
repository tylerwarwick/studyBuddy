import '../App.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
import CardRender from '../components/cardRender';
import Button from '../components/button';
import { useParams } from 'react-router-dom';

interface Card {
    id : number;
    question : string;
    answer : string;
    isKnown : boolean;
}

type deckID = {a : string}


const Practice = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const params = useParams<deckID>() as string;

    //Fetch data from server on refresh
    useEffect(() => {
        axios.get("http://localhost:3001/classes")
        .then(Response => {
            setCards(cards.concat(Response.data[Object.values(params)[0]] as Card[]))
            console.log(Object.values(params)[0])
            });

        
    }, [])
    
   
    //Get cards that aren't memorized yet
    const checkIsKnown = (card : Card) => {if (!card.isKnown) return card};    
    let activeCards = cards.filter(checkIsKnown);
     
    //Store length of question deck to infinitely cycle through deck until empty
    const [index, updateIndex] = useState(0);
    
     
    //Define state for which way card is facing
    //Pass function to update state to child card component
    const [frontFacing, setFrontFacing] = useState(true);
    const flipCard = () => setFrontFacing(frontFacing => !frontFacing);
     
    //Loop through deck forever
    const loopIndex = () => {return index == activeCards.length - 1 ? 0 : index + 1};
     
    //On button click we get next card in deck and default state to show question
    const knownClick = () => {
        updateIndex(loopIndex);
        setFrontFacing(true); 
    }
     
    const unknownClick = () => {
        updateIndex(loopIndex);
        setFrontFacing(true);
     
    }
     
         
     
    let currentCard = activeCards[index];
         
    return (
        <div className='bg-gray-900 h-screen flex flex-col space-y-3 items-center justify-center select-none'>
            <CardRender displayText={frontFacing ? currentCard?.question : currentCard?.answer} func={flipCard}/>
     
            <div className='space-x-3'>
                <Button clickHandler={unknownClick} displayTag="I Don't Know This One"></Button>
                <Button clickHandler={knownClick} displayTag='I Know This One'></Button>
            </div>
        </div>
    );
}

export default Practice;
