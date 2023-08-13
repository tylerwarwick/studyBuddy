import '../App.css';
import {useState} from 'react';
import CardRender from '../components/cardRender';
import Button from '../components/button';

import { ICard } from '../types/card';

const TutorialPractice = () => {
    const sampleCards = 
    [
        {
            id: '1',
            question: 'What is the powerhouse of the cell?',
            answer: 'Mitochondria',
            isKnown: false,
            deck: 'sample deck'
        },
        {
            id: '2',
            question: 'What is the most abundant element in the universe?',
            answer: 'Hydrogen',
            isKnown: false,
            deck: 'sample deck'
        },
        {
            id: '3',
            question: 'What is the function of the blood cell?',
            answer: 'To carry oxygen around the body.',
            isKnown: false,
            deck: 'sample deck'
        },
        {
            id: '4',
            question: 'What is the center of an atom called?',
            answer: 'The Nucleus',
            isKnown: false,
            deck: 'sample deck'
        },
        {
            id: '5',
            question: 'What do you call the process of breaking white light into colors?',
            answer: 'Refraction',
            isKnown: false,
            deck: 'sample deck'
        }
    ]

    const [cards, setCards] = useState<ICard[]>(sampleCards);
    const [index, setIndex] = useState(0);
           
    
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


    return (
            <div className='bg-gray-900 h-full flex flex-col space-y-3 items-center justify-center select-none'>
                <CardRender displayText={
                              (cards.some((c) => c.isKnown === false)) ? (
                            frontFacing ? cards[index]?.question : cards[index]?.answer ) :
                            "You've completed this set of questions. Hit the reset button for more practice."
                        } func={flipCard}/>
                <div className='space-x-3 w-full flex justify-center'>
                {
                    //If there is some unknown cards, practice as usual
                    //If all cards are known, present reset deck button
                    (cards.some((c) => c.isKnown === false)) ? 
                    (<>
                    <Button clickHandler={unknownClick} displayTag="I Don't Know This One"></Button>
                    <Button clickHandler={knownClick} displayTag='I Know This One'></Button> </>
                    ) : 
                    ( <button onClick={resetDeck} className='text-white focus:ring-4 w-full focus:outline-none font-bold rounded-lg text-lg  sm:w-96 h-16 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800'>Reset Deck</button> )
                }
                </div>
            </div>
        );
    }

export default TutorialPractice;