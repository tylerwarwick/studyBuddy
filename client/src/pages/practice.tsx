import '../App.css';
import axios from 'axios';
import {useState, useEffect, useContext} from 'react';
import CardRender from '../components/cardRender';
import Button from '../components/button';
import { useNavigate, useParams } from 'react-router-dom';
import { ICard } from '../types/card';
import CardService from '../services/cardService';
import { UserContext } from '../services/userContext';
import LoginService from '../services/loginService';

type deckID = {a : string}


const Practice = () => {
    const [cards, setCards] = useState<ICard[]>([]);
    const [index, setIndex] = useState(0);
    const { deckId } = useParams<string>();
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);



    //Fetch data from server on refresh
    useEffect(() => {
        const getData = async () => {
            //Get param from url and pass to api to return cards
            const data = await CardService.getCards(deckId!);

            //Handle bad token
            if (!data) {
                LoginService.logout();
                setUser(null);
                navigate('/login');
            }

            const cardsCopy = data as ICard[];
            setCards(() => cardsCopy);
            setIndex(() => cardsCopy.findIndex((card) => card.isKnown === false))

            
        }
    
        getData();
        
    }, [])
    
   
    
    //Define state for which way card is facing
    //Pass function to update state to child card component
    const [frontFacing, setFrontFacing] = useState(true);
    const flipCard = () => setFrontFacing(frontFacing => !frontFacing);
     
    //Loop through deck forever
    const loopIndex = () => {
        //There has to be an unknown card in the deck
        if (cards.some((c) => c.isKnown === false)){
            //Find the next unknown card after the current card
            const nextCardId = (cards.slice(index+1).find((c) => c.isKnown === false))?.id;

            //If all cards beyond current index are known, find first card from front of deck
            if (nextCardId === undefined) setIndex(() => cards.findIndex((c) => c.isKnown === false));

            //Otherwise find the next card that's unknown as per original plan
            else {
                //Just need to account for being at the end of the deck
                index === cards.length - 1 ? setIndex(() => cards.findIndex((c) => c.isKnown === false))
                : setIndex(() => cards.findIndex((c) => c.id === nextCardId));
            }
        }
        
    
    }

    //Set card to known 
    const updateKnown = cards.map((c) => {
        if (c.id === cards[index].id) return {...c, isKnown : true}

        return c;
    })
     
    //On button click we get next unknown card
    const knownClick = () => {
        //Update current card to known
        setCards(updateKnown)
        //Get next unknown card
        loopIndex()
        //Reset to front of next card
        setFrontFacing(true); 
    }
     
    const unknownClick = () => {
        //Get next unknown card
        loopIndex()
        //Reset to front of next card
        setFrontFacing(true);
     
    }
     
    const resetDeck = () => {
        //Set all cards to unknown for more practice
        setCards((cards) => cards.map((c) => {
            return {...c, isKnown : false}
        }))

        //Reset to first card in deck
        setIndex(() => 0)
        
     
    }

    //If there is some unknown cards, practice as usual
    if (cards.some((c) => c.isKnown === false)) {
       
        return (
            <div className='bg-gray-900 h-screen flex flex-col space-y-3 items-center justify-center select-none'>
                <CardRender displayText={frontFacing ? cards[index]?.question : cards[index]?.answer} func={flipCard}/>
        
                <div className='space-x-3'>
                    <Button clickHandler={unknownClick} displayTag="I Don't Know This One"></Button>
                    <Button clickHandler={knownClick} displayTag='I Know This One'></Button>
                </div>
            </div>
        );
    }

    //If all cards are known, present reset deck button
    else {
        return (
            <div className='bg-gray-900 h-screen flex flex-col space-y-3 items-center justify-center select-none'>
                <CardRender displayText={"You've completed all of the questions"} func={flipCard}/>
                <button onClick={resetDeck} className='text-white focus:ring-4 focus:outline-none font-bold rounded-lg text-lg w-full md:w-96 h-16 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800'>Reset Deck</button>
            </div>
        );
    }
}

export default Practice;