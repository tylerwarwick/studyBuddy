import { useState } from 'react';
import '../App.css';


//Need to accept function as prop so that we can update parent state from child
interface CardProps {
    displayText : string;
    func : () => void;

}



export default function CardRender({displayText : text, func : flip} : CardProps) {
    return (
        <a onClick={flip} className="block w-full h-56 md:w-96 md:h-64 flex items-center py-6 justify-center whitespace-normal p-16 border rounded-lg shadow bg-gray-800 border-gray-700 hover:bg-gray-700 overflow-y-scroll">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white text-center px-5 select-none">{text}</h5>
        </a>
    );


}