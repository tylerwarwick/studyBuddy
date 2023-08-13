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
        <div>
            <div className="w-screen [@media(min-width:281px)]:w-full flex flex-col justify-center items-center space-y-2 py-8 px-6 sm:px-6 w-full md:w-96 h-64 border rounded-lg shadow bg-gray-800 border-gray-700">
                <div className="text-center">
                    <textarea  ref={ref} onChange={(event) => {setDeckTitle(event.target.value)}} 
                    value={deckTitle} minLength={2} maxLength={20} spellCheck='false'
                    onKeyDown={(event) => {onEnter(event)}} 
                    onBlur={() => updateDecks()}
                    className="mb-2 w-72 text-center bg-inherit text-5xl font-bold resize-none h-fit focus:outline-white tracking-tight text-white no-scrollbar overflow-y-clip"></textarea>
                </div>
                <div className="space-x-3 justify-center">
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