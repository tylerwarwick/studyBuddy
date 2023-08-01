import { SetStateAction, useEffect, useState } from "react";
import "../App.css"
import DeckCard from "../components/deckCard";
import axios from "axios";
import NewDeck from "../components/newDeck";





export default function DeckLobby() {
    const [decks, setDecks] = useState<string[]>([]);

    useEffect(() => {
        axios.get("http://localhost:3001/classes")
        .then(Response => {
            setDecks(Object.keys(Response.data));
            
            });
    }, [])

    //grid [@media(min-width:1290px)]:grid-cols-3 gap-10 [@media(max-width:1289px)]:grid-cols-2 [@media(max-width:880px)]:grid-cols-1

    return (
        
        <div className="min-h-screen h-fit bg-gray-900 min-w-full w-fit p-8">
            <div className="flex justify-center items-center m-6">
                <div className="grid [@media(min-width:1290px)]:grid-cols-3 gap-10 [@media(max-width:1289px)]:grid-cols-2 [@media(max-width:880px)]:grid-cols-1">
                    {decks.map((deckName, index) => (
                        <DeckCard decks={decks} deckIndex={index} setDecks={setDecks}/>             
                        ))}
                    <NewDeck decks={decks} setDecks={setDecks}/>
                </div>
            </div>
        </div>
       
    );
}