import { useRef, useState } from 'react';
import '../App.css'
import { AltPlusIcon } from '../icons/altPlusIcon'
import axios from 'axios';
import { Deck } from '../types/deck';

interface props {
    decks : Deck[];
    setDecks : React.Dispatch<React.SetStateAction<Deck[]>>
}


export default function NewDeck({decks : decks, setDecks : setDecks} : props){
    const ref = useRef<HTMLTextAreaElement>(null);
    const [deckTitle, setDeckTitle] = useState("")
    const [hidden, setHidden] = useState(false)


    const updateDecks = () => {
        //Check to make sure length of new possible name is atleast 2
        const len = deckTitle.length;

        if (len >= 2){
            console.log("Requirements met")
            setDecks(decks.concat());
            //axios.post()


            //UPDATEBACKEND WITH STATE VALUES NOW
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
                <div className="w-full md:w-96 h-64 px-6 border rounded-lg shadow bg-gray-800 hover:bg-gray-700 border-gray-700">
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