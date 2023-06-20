import { useState } from 'react';
import '../App.css';

interface Card {
    Question : string;
    Answer : string;
    IsKnown : boolean;
}

export default function StudyCard({Question : question, Answer : answer, IsKnown : isKnown} : Card) {
    const [frontFacing, flipCard] = useState(true);
    const flip = () => flipCard(frontFacing => !frontFacing);

    return (
        <a onClick={flip} className="block max-w-md mx-h-md p-20 border rounded-lg shadow bg-gray-800 border-gray-700 hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white text-center">{frontFacing ? question : answer}</h5>
        </a>
    );
}