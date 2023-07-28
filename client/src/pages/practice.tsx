import '../App.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
import CardRender from '../components/cardRender';
import Button from '../components/button';
import { useParams } from 'react-router-dom';
import { createTypeReferenceDirectiveResolutionCache } from 'typescript';

interface Card {
    id : number;
    question : string;
    answer : string;
    isKnown : boolean;
}

type deckID = {a : string}


const Practice = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [uC, setUc] = useState<Card[]>([])
    
    const params = useParams<deckID>() as string;

    //Fetch data from server on refresh
    useEffect(() => {
        const getData = async () => {
            const data = (await axios.get("http://localhost:3001/classes")).data;
            const arr = data[Object.values(params)[0]] as Card[]
            setCards(arr)
            setUc(arr.filter((c) => {return c.isKnown == false}))
        }
        
        getData();
        
    }, [])
    
   
    //Store length of question deck to infinitely cycle through deck until empty
    const [index, updateIndex] = useState(0);
    
    
    
    //Define state for which way card is facing
    //Pass function to update state to child card component
    const [frontFacing, setFrontFacing] = useState(true);
    const flipCard = () => setFrontFacing(frontFacing => !frontFacing);
     
    //Loop through deck forever
    const loopIndex = () => {
        return index == uC.length - 1 ? updateIndex(() => 0) : updateIndex(() => index+1)
    
    }

    const updateKnown = uC.map((c) => {
        if (c.id === uC[index].id) return {...c, isKnown : true}

        return c;
    })
     
    //On button click we get next card in deck and default state to show question
    const knownClick = () => {
        setUc(updateKnown)
        setUc((uC)=>uC.filter((c)=> { return c.isKnown == false } ))
        setFrontFacing(true); 
       
        console.log(uC)
    }
     
    const unknownClick = () => {
        loopIndex()
        setFrontFacing(true);
     
    }
     
    const resetDeck = () => {
        setCards((cards) => cards.map((c) => {
            return {...c, isKnown : false}
        }))

        const copy = cards
        setUc(copy)

        console.log(cards);
        console.log(uC);
    }

    if (uC.length == 0) {
        return (
            <div className='bg-gray-900 h-screen flex flex-col space-y-3 items-center justify-center select-none'>
                <CardRender displayText={"You've completed all of the questions"} func={flipCard}/>
                <button onClick={resetDeck} className='text-white focus:ring-4 focus:outline-none font-bold rounded-lg text-lg w-96 h-16 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800'>Reset Deck</button>
            </div>
            );
    }

    else {
        return (
        <div className='bg-gray-900 h-screen flex flex-col space-y-3 items-center justify-center select-none'>
            <CardRender displayText={frontFacing ? uC[index]?.question : uC[index]?.answer} func={flipCard}/>
    
            <div className='space-x-3'>
                <Button clickHandler={unknownClick} displayTag="I Don't Know This One"></Button>
                <Button clickHandler={knownClick} displayTag='I Know This One'></Button>
            </div>
        </div>
        );
    }
}

export default Practice;