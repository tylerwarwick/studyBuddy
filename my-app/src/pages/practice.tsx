import '../App.css';
import {useState} from 'react';
import Card from '../components/card';
import Button from '../components/button';
import { CardProps } from '../components/card';



const cards = [
    {
        "question" : "What is the powerhouse of the cell?",
        "answer" : "Mitochondria",
        "isKnown" : false
    },
    {
        "question": "What makes plant cells unique?",
        "answer": "Plant cells have a vacuole to maintain turgor pressure",
        "isKnown": false
    },
    {
        "question" : "Do my balls itch?",
        "answer" : "Yes",
        "isKnown": false
    }
    ];


    

const Practice = () => {
    const [index, updateIndex] = useState(0);
    let deckLength = cards.length;

    const loopIndex = () => {return index == deckLength - 1 ? 0 : index + 1};
    const handleClick = (e : React.MouseEvent<HTMLButtonElement>) => updateIndex(loopIndex);
    let sampleCard = cards[index];

    

    return (
        <div className='bg-gray-900 h-screen flex flex-col space-y-3 items-center justify-center select-none'>
            <Card question={sampleCard.question} answer={sampleCard.answer} isKnown={sampleCard.isKnown} />

            <div className='space-x-3'>
                <Button clickHandler={handleClick} displayTag="I don't know it"></Button>
                <Button clickHandler={handleClick} displayTag='I know it'></Button>
            </div>
        </div>
    );
}

export default Practice;