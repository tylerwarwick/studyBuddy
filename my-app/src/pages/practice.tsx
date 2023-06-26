import '../App.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
import CardRender from '../components/cardRender';
import Button from '../components/button';

interface Card {
    id : number;
    question : string;
    answer : string;
    isKnown : boolean;
}

const c1 : Card = {
    id : 10,
    question : "How r u?",
    answer : "Shitty",
    isKnown : false
}

const Practice = () => {
    const [cards, setCards] = useState<Card[]>([])

   
    axios.get("http://localhost:3001/notes")
    .then(Response => {
        
        let temp : Card[] = Response.data as Card[];
        console.log(temp)
        setCards(current => [...current, c1]);
        console.log(cards);
    })
    


    //Get cards that aren't memorized yet
    const checkIsKnown = (card : Card) => {if (!card.isKnown) return card};    
    let activeCards = cards.filter(checkIsKnown);

    //Store length of question deck to infinitely cycle through deck until empty
    const [index, updateIndex] = useState(0);
    let deckLength = activeCards.length;

    //Define state for which way card is facing
    //Pass function to update state to child card component
    const [frontFacing, updateDirection] = useState(true);
    const flipCard = () => updateDirection(frontFacing => !frontFacing);

    //Loop through deck forever
    const loopIndex = () => {return index == deckLength - 1 ? 0 : index + 1};

    //On button click we get next card in deck and default state to show question
    const knownClick = (e : React.MouseEvent<HTMLButtonElement>) => {
        updateIndex(loopIndex);
        updateDirection(true);
        
    }

    const unknownClick = (e : React.MouseEvent<HTMLButtonElement>) => {
        updateIndex(loopIndex);
        updateDirection(true);

    }

    

    let currentCard = activeCards[index];
    
    return (
        <div className='bg-gray-900 h-screen flex flex-col space-y-3 items-center justify-center select-none'>
            <CardRender displayText={frontFacing ? currentCard.question : currentCard.answer} func={flipCard}/>

            <div className='space-x-3'>
                <Button clickHandler={unknownClick} displayTag="I Don't Know This One"></Button>
                <Button clickHandler={knownClick} displayTag='I Know This One'></Button>
            </div>
        </div>
    );
}

export default Practice;