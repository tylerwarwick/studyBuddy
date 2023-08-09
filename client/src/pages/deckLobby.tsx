import { useEffect, useState } from "react";
import "../App.css"
import DeckCard from "../components/deckCard";
import axios from "axios";
import NewDeck from "../components/newDeck";
import { Deck } from "../types/deck";






export default function DeckLobby() {
    const [decks, setDecks] = useState<Deck[]>([]);

    useEffect(() => {
        axios.get("http://localhost:3001/decks")
        .then(Response => {
            console.log('Hello')
            console.log(Response.data)
            setDecks(Response.data);
            
            });
    }, [])

    //grid [@media(min-width:1290px)]:grid-cols-3 gap-10 [@media(max-width:1289px)]:grid-cols-2 [@media(max-width:880px)]:grid-cols-1

    return (
        
        <div className="min-h-screen h-full bg-gray-900 w-screen ">
            <div className="flex justify-center items-center py-6">
                
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