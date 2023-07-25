import { useRef, useState } from 'react';
import '../App.css'
import { AltPlusIcon } from '../icons/altPlusIcon'
import axios from 'axios';

interface props {
    decks : string[];
    setDecks : React.Dispatch<React.SetStateAction<string[]>>
}


export default function NewDeck({decks : decks, setDecks : setDecks} : props){
    const ref = useRef<HTMLTextAreaElement>(null);
    const [deckTitle, setDeckTitle] = useState("")
    const [hidden, setHidden] = useState(false)


    const updateDecks = () => {
        //Check if there is any repeats
        const matches = (decks.filter((d) => d == deckTitle)).length;
        //Check to make sure length of new possible name is atleast 2
        const len = deckTitle.length;

        if (matches == 0 && len >= 2){
            console.log("Requirements met")
            setDecks(decks.concat(deckTitle));
            


            //UPDATEBACKEND WITH STATE VALUES NOW
        }

        else if (matches != 0) {
            alert("Deck title can't match any other deck titles")
        }
            
        else if (len < 2) {
            alert("Deck title must be atleast 2 characters long")
        }

        setHidden(false)
        setDeckTitle("")
        
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
        setTimeout(() => {ref.current!.focus()}, 100)
    }
    return(
        
        <div className="relative">
            <a onClick={()=>handleClick()}>
                <div className="max-w-sm w-96 h-64 px-6 border rounded-lg shadow bg-gray-800 hover:bg-gray-700 border-gray-700">
                    <div className={hidden ? "hidden" : ""}>
                        <div className="absolute top-10 text-6xl text-white left-1/2 transform -translate-x-1/2 text-center">
                            <AltPlusIcon/>
                        </div>
                        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center">
                            <div className='text-white font-bold text-4xl text-center'>
                                Add New Deck
                            </div>
                        </div>
                    </div>
                </div>
            </a>

            <div className={(hidden ? "" : "hidden ") + "absolute top-12 left-1/2 transform -translate-x-1/2 text-center"}>
                <textarea  ref={ref} onChange={(event) => {setDeckTitle(event.target.value)}} 
                value={deckTitle} minLength={2} maxLength={20} spellCheck='false'
                onKeyDown={(event) => {onEnter(event)}} 
                onBlur={() => updateDecks()}
                autoFocus
                className="mb-2 w-72 text-center bg-inherit text-5xl font-bold resize-none h-fit focus:outline-white tracking-tight text-white"></textarea>
            </div>
        </div>
            
        
    )
}