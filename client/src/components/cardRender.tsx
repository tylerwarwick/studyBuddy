import { useState } from 'react';
import '../App.css';


//Need to accept function as prop so that we can update parent state from child
interface CardProps {
    displayText : string;
    func : () => void;

}



export default function CardRender({displayText : text, func : flip} : CardProps) {
    return (
        <a onClick={flip} className="block w-96 h-64 flex items-center justify-center p-16 border rounded-lg shadow bg-gray-800 border-gray-700 hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white text-center">{text}</h5>
        </a>
    );


}