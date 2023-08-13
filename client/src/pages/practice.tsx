import '../App.css';

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

        //Need an else clause for placeholder if all cards are known on refresh
        else setIndex(() => 0);
        
    
    }

   
    //On button click we get next unknown card
    const knownClick = () => {
        //Update known status on backend and frontend
        const updateCard = async () => {
            //Send put request
            const card: ICard = cards[index];
            const updatedCard = await CardService.editCard(card.question, card.answer, true, card.id)

            //Handle bad token
            if (!updatedCard) {
                LoginService.logout();
                setUser(null);
                navigate('/login');
            }

            //Update frontend state
            const updateKnown = cards.map((c) => {
                if (c.id === card.id) return {...c, isKnown : true}

                return c;
            })

            setCards(updateKnown)
        }

        updateCard();

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
        const resetCards = async () => {
            //Send put request
            const resetVerification = await CardService.resetDeck(deckId!)

            //Handle bad token
            if (!resetVerification) {
                LoginService.logout();
                setUser(null);
                navigate('/login');
            }

            //Set all cards to unknown on frontend 
            setCards((cards) => cards.map((c) => {
            return {...c, isKnown : false}
        }))
        }

        resetCards();

        //Reset to first card in deck
        setIndex(() => 0);
    }


   
       
        return (
            <div className='bg-gray-900 h-screen flex flex-col space-y-3 items-center justify-center select-none'>
              
                { (cards.length === 0) ? 
                
                    <div className='w-full [@media(min-width:281px)]:w-11/12 sm:w-96 flex justify-center items-center'>
                        <CardRender displayText="This deck doesn't have any cards yet. Click here to add some." func={() => navigate(`/edit-deck/${deckId}`)}/>
                    </div>
                
                : 
                
                <div className='flex justify-center'>
                    <div className='space-y-3 flex flex-col'>
                   
                        <CardRender displayText={
                              (cards.some((c) => c.isKnown === false)) ? (
                            frontFacing ? cards[index]?.question : cards[index]?.answer ) :
                            "You've completed this set of questions. Hit the reset button for more practice."
                        } func={flipCard}/>
                        <div className='space-x-3'>
                            {
                            //If there is some unknown cards, practice as usual
                            //If all cards are known, present reset deck button
                            (cards.some((c) => c.isKnown === false)) ? 
                            (<div className='flex justify-center space-x-3'>
                            <Button clickHandler={unknownClick} displayTag="I Don't Know This One"></Button>
                            <Button clickHandler={knownClick} displayTag='I Know This One'></Button> 
                            </div>
                            ) : 
                            ( <button onClick={resetDeck} className='text-white focus:ring-4 focus:outline-none font-bold rounded-lg text-lg w-full px-24 sm:w-96 h-16 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800'>Reset Deck</button> )
                            }   
                        </div>
                    </div>
                </div>
                }
            </div>
            
        );
    }

export default Practice;