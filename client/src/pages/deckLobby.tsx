import { useEffect, useState } from "react";
import "../App.css"
import DeckCard from "../components/deckCard";
import axios from "axios";





export default function DeckLobby() {
    const [decks, setDecks] = useState<string[]>([]);

    useEffect(() => {
        axios.get("http://localhost:3001/classes")
        .then(Response => {
            setDecks(Object.keys(Response.data))
            console.log(Object.keys(Response.data))

            });
    }, [])


    return (
        <div className="flex justify-center m-6">
            <div className="grid grid-cols-3 gap-12">
            {decks.map((deckName) => (
                    <DeckCard displayText={deckName} />             
                    ))}
            </div>
        </div>
    );
}