import { useRef, useState } from "react"
import "../App.css"

interface props {
    decks : string[];
    setDecks : React.Dispatch<React.SetStateAction<string[]>>
    deckIndex : number;
}

export default function DeckCard({decks : decks, setDecks : setDecks, deckIndex : deckIndex} : props) {
    const ref = useRef<HTMLTextAreaElement>(null);
    const [deckTitle, setDeckTitle] = useState(decks[deckIndex])


    const updateDecks = () => {
        //Check if there is any repeats
        const matches = (decks.filter((d) => d == deckTitle)).length;
        //Check to make sure length of new possible name is atleast 2
        const len = deckTitle.length;

        if (matches == 0 && len >= 2){
            console.log("Requirements met")
            setDecks(decks.map((deck : string, index : number) => {
                if (index == deckIndex) return deckTitle;
                return deck
            }));


            //UPDATEBACKEND WITH STATE VALUES NOW
        }



        else if (matches != 0) {
            setDeckTitle(decks[deckIndex])
            alert("Deck title can't match any other deck titles")
        }

            
        else if (len < 2) {
            setDeckTitle(decks[deckIndex])
            alert("Deck title must be atleast 2 characters long")
        }

        
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
            <div className="max-w-sm w-96 h-64 px-6 border rounded-lg shadow bg-gray-800 border-gray-700">
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-center">
                    <textarea  ref={ref} onChange={(event) => {setDeckTitle(event.target.value)}} 
                    value={deckTitle} minLength={2} maxLength={20} spellCheck='false'
                    onKeyDown={(event) => {onEnter(event)}} 
                    onBlur={() => updateDecks()}
                    className="mb-2 w-72 text-center bg-inherit text-5xl font-bold resize-none h-fit focus:outline-white tracking-tight text-white"></textarea>
                </div>
                <div className="absolute space-x-3 bottom-12 left-1/2 transform -translate-x-1/2">
                    <a href={'/edit-deck/' + decks[deckIndex]} className="inline-flex items-center px-7 py-4 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
                        Edit
                    </a>
                    <a href={'/practice/' + decks[deckIndex]} className="inline-flex items-center px-4 py-4 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
                        Practice
                    </a>
                </div>
            </div>
        </div>
    )
}