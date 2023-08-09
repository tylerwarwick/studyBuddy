import { useRef, useState } from "react"
import "../App.css"
import { IDeck } from "../types/deck";
import DeckService from "../services/deckService";
import { useNavigate } from "react-router-dom";

interface deckCardProps {
    deck : IDeck;
    decks : IDeck[];
    setDecks : React.Dispatch<React.SetStateAction<IDeck[]>>;
}

export default function DeckCard({deck : deck, decks : decks, setDecks : setDecks} : deckCardProps) {
    const ref = useRef<HTMLTextAreaElement>(null);
    const [deckTitle, setDeckTitle] = useState<string>(deck.name)
    const navigate = useNavigate()

    const updateDecks = async () => {
        //Update backend
        const updatedDeck = await DeckService.updateDeck(deckTitle, deck.id);
        if (updatedDeck === null) navigate('/login')
        
        //Update frontend state in deck lobby 
        setDecks((decks) => {
            return decks.map((deckIterative) => {
                if (deckIterative.id === deck.id) return {...deck, name : deckTitle};
                return deckIterative;
            })
        })        
    }

    

    const onEnter = (e : React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter'){
            //Exit text area on enter
            //This will subsequently trigger updateDecks
            e.preventDefault();
            ref.current!.blur();
        }
    }

    

    return (
        <div className="relative">
            <div className="max-w-sm w-screen md:w-96 h-64 px-6 border rounded-lg shadow bg-gray-800 border-gray-700">
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-center">
                    <textarea  ref={ref} onChange={(event) => {setDeckTitle(event.target.value)}} 
                    value={deckTitle} minLength={2} maxLength={20} spellCheck='false'
                    onKeyDown={(event) => {onEnter(event)}} 
                    onBlur={() => updateDecks()}
                    className="mb-2 w-72 text-center bg-inherit text-5xl font-bold resize-none h-fit focus:outline-white tracking-tight text-white"></textarea>
                </div>
                <div className="absolute space-x-3 bottom-12 left-1/2 transform -translate-x-1/2">
                    <a href={'/edit-deck/' + deck.id} className="inline-flex items-center px-7 py-4 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
                        Edit
                    </a>
                    <a href={'/practice/' + deck.id} className="inline-flex items-center px-4 py-4 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
                        Practice
                    </a>
                </div>
            </div>
        </div>
    )
}