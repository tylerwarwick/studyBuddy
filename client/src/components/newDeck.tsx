import { useRef, useState } from 'react';
import '../App.css'
import { AltPlusIcon } from '../icons/altPlusIcon'
import { IDeck } from '../types/deck';
import DeckService from '../services/deckService';
import { useNavigate } from 'react-router-dom';

interface newDeckCardProps {
    decks : IDeck[];
    setDecks : React.Dispatch<React.SetStateAction<IDeck[]>>;
}


export default function NewDeck({decks : decks, setDecks : setDecks} : newDeckCardProps){
    const ref = useRef<HTMLTextAreaElement>(null);
    const [deckTitle, setDeckTitle] = useState("")
    const [hidden, setHidden] = useState(false)
    const navigate = useNavigate()

    const updateDecks = async () => {
        //Update backend
        //Get response data 
        //If null prompt the user to login again their token is expired
        const newDeck = await DeckService.newDeck(deckTitle);
        if (newDeck === null) return navigate('/login');

        //Type cast data to deck
        const newDeckObj : IDeck = newDeck as IDeck

        //Append to frontend state
        setDecks(deck => decks.concat(newDeckObj))

        //Reset new deck card to blank
        setDeckTitle(() => '')
        setHidden(false);
        
    }

    

    const onEnter = (e : React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter'){
            //Exit text area on enter
            //This will subsequently trigger updateDecks
            e.preventDefault();
            ref.current!.blur();
        }
    }

    const handleClick = () => {
        setHidden(true)
        setTimeout(() => {ref.current!.focus()}, 10)
    }
    return(
        <div className="">
            <a onClick={()=>handleClick()}>
                <div className="w-screen [@media(min-width:281px)]:w-full flex flex-col justify-content items-center md:w-96 h-64 px-12 border rounded-lg shadow bg-gray-800 hover:bg-gray-700 border-gray-700">
                    <div className={(hidden ? "hidden " : "") + "flex flex-col items-center justify-content py-10 space-y-9"}>
                        <div className="text-6xl text-white text-center">
                            <AltPlusIcon/>
                        </div>
                        <div className="text-center">
                            <div className='text-white font-bold text-4xl text-center'>
                                Add New Deck
                            </div>
                        </div>
                    </div>
                    <div className={(hidden ? "" : "hidden ") + "py-11"}>
                        <textarea  ref={ref} onChange={(event) => {setDeckTitle(event.target.value)}} 
                        value={deckTitle} minLength={2} maxLength={20} spellCheck='false'
                        onKeyDown={(event) => {onEnter(event)}} 
                        onBlur={() => updateDecks()}
                        autoFocus
                        className="mb-2 w-72 text-center bg-inherit text-5xl font-bold resize-none h-fit focus:outline-white tracking-tight text-white no-scrollbar overflow-y-clip"></textarea>
                    </div>
                </div>
            </a>
        </div>
            
        
    )
}